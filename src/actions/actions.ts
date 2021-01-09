import { v4 as uuidv4 } from "uuid";
import { Entry, OverviewData, User, UserBreakdownData } from "../models/models";

// Updates an entry's list of excluded users.
export function setExcludedUsers(
  entry: Entry,
  newExcludedUsers: User[],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  let updatedEntry: Entry = { ...entry, exclude: newExcludedUsers };

  setEntries((entries) => {
    let entriesCopy = [...entries];
    entriesCopy[entries.indexOf(entry)] = updatedEntry;
    return entriesCopy;
  });
}

// Removes an user from an entry's excluded user list (if it is excluded).
export function removeExcludedUser(
  user: User,
  entry: Entry,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  const userIdx = entry.exclude.indexOf(user);
  if (userIdx !== -1) {
    let excludeCopy = Array.from(entry.exclude);
    excludeCopy.splice(userIdx, 1);
    const updatedEntry: Entry = { ...entry, exclude: excludeCopy };
    setEntries((entries) => {
      let entriesCopy = [...entries];
      entriesCopy[entries.indexOf(entry)] = updatedEntry;
      return entriesCopy;
    });
  }
}

// Adds a new user.
export function addUser(
  firstName: string,
  lastName: string,
  email: string,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): void {
  // Input is valid! Add new user.
  const newUser: User = {
    id: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    initials: `${firstName.charAt(0).toLocaleUpperCase()}${lastName
      .charAt(0)
      .toLocaleUpperCase()}`,
    displayName: `${firstName} ${lastName}`,
    email: email,
  };
  setUsers((users) => [...users, newUser]);
}

// Deletes a user and all of its entries.
export function deleteUser(
  user: User,
  users: User[],
  entries: Entry[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  // Delete user from user state.
  setUsers(users.filter((cur) => user !== cur));
  // Delete all entries associated with user from user state.
  let updatedEntries = entries.filter((entry) => entry.createdBy !== user);

  // Removes user from excluded user lists.
  updatedEntries.forEach((entry, idx) => {
    if (entry.exclude.includes(user)) {
      let newExcludedUsers = entry.exclude.filter((cur) => user !== cur);
      let updatedEntry: Entry = { ...entry, exclude: newExcludedUsers };
      updatedEntries[idx] = updatedEntry;
    }
  });
  setEntries(updatedEntries);
}

// Adds a new entry.
export function addEntry(
  curUser: User,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
  item?: string,
  cost?: number,
  excludedUsers?: User[],
  note?: string
) {
  const newItem: Entry = {
    id: uuidv4(),
    item: !!item ? item : "",
    cost: !!cost ? cost : 0,
    exclude: !!excludedUsers ? excludedUsers : [],
    note: !!note ? note : "",
    createdBy: curUser,
  };
  setEntries((entries) => [...entries, newItem]);
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

// "Calculates" an avatar's color.
export function getAvatarColor(user: User): string {
  const colors = [
    "#1abc9c",
    "#f1c40f",
    "#f39c12",
    "#c0392b",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
  ];

  var h = 0,
    l = user.email.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + user.email.charCodeAt(i++)) | 0;
  return colors[Math.abs(h % colors.length)];
}

// Calculates and returns the breakdown data.
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

  return breakdownData;
}
