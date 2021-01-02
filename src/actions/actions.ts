import { Entry, OverviewData, User } from "../models/models";

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

    const includedUsers = users.filter((user) => !entry.exclude.includes(user));
    const userCost = entry.cost / includedUsers.length;

    includedUsers.forEach((user) => {
      overviewData[user.id].totalOwed += userCost;
    });
  });

  return overviewData;
}
