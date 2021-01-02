import { Entry, OverviewData, User, UserBreakdownData } from "../models/models";

// Removes an user from an entry's excluded user list (if it is excluded).
export function removeExcludedUser(
  user: User,
  entry: Entry,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  const userIdx = entry.exclude.indexOf(user);
  if (userIdx !== -1) {
    let excludeCopy = [...entry.exclude];
    excludeCopy.splice(userIdx, 1);
    const updatedEntry: Entry = { ...entry, exclude: excludeCopy };

    setEntries((entries) => {
      let entriesCopy = [...entries];
      entriesCopy[entries.indexOf(entry)] = updatedEntry;
      return entriesCopy;
    });
  }
}

// Deletes a user and all of its entries.
export function deleteUser(
  user: User,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  // Delete user from user state.
  setUsers(users.filter((cur) => user !== cur));
  // Delete all entries associated with user from user state.
  setEntries((entries) => entries.filter((entry) => entry.createdBy !== user));
}

// Deletes a single entry.
export function deleteEntry(
  entry: Entry,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  setEntries((entries) => entries.filter((cur) => entry !== cur));
}

// Calculates and returns the overview data.
export function calculateOverview(
  entries: Entry[],
  users: User[]
): OverviewData {
  let overviewData: OverviewData = {};

  // Create entries for each user.
  users.forEach((user) => {
    overviewData[user.id] = { totalSpent: 0, totalOwed: 0 };
  });

  entries.forEach((entry) => {
    overviewData[entry.createdBy.id].totalSpent += entry.cost;

    const validUsers = users.filter((user) => !entry.exclude.includes(user));
    const userCost = entry.cost / validUsers.length;

    validUsers.forEach((user) => {
      if (user !== entry.createdBy) {
        overviewData[user.id].totalOwed += userCost;
      }
    });
  });

  return overviewData;
}

export function calculateUserBreakdown(
  user: User,
  entries: Entry[],
  users: User[]
) {
  let breakdownData: UserBreakdownData = {
    user: user,
    totalSpent: 0,
    totalOwed: 0,
    userBreakdown: {},
  };

  users.forEach((curUser) => {
    if (curUser !== user) {
      breakdownData.userBreakdown[curUser.id] = { theyOwe: 0, youOwe: 0 };
    }
  });

  entries.forEach((entry) => {
    const numEntryUsers = users.length - entry.exclude.length;
    if (entry.createdBy === user) {
      // This is the specified user's entry. Add the cost to totalSpent and
      // increment "theyOwe" for all valid users.
      breakdownData.totalSpent += entry.cost;

      const validUsers = users.filter(
        (user) => !entry.exclude.includes(user) && user !== entry.createdBy
      );
      validUsers.forEach((user) => {
        breakdownData.userBreakdown[user.id].theyOwe +=
          entry.cost / numEntryUsers;
      });
    } else if (!entry.exclude.includes(user)) {
      // This is another user's entry that you need to pay for. Add the cost to
      // totalOwed and increment "youOwe" for this particular user.
      breakdownData.totalOwed += entry.cost / numEntryUsers;
      breakdownData.userBreakdown[entry.createdBy.id].youOwe +=
        entry.cost / numEntryUsers;
    }
  });

  console.log(breakdownData);
}
