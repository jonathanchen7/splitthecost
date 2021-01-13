import { nanoid } from "nanoid";
import { Entry, OverviewData, User, UserBreakdownData } from "../models/models";
import { firestore } from "../firebase";

// Updates an entry's list of excluded users.
export function updateExcludedUsers(
  entry: Entry,
  newExcludedUsers: string[],
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
  userId: string,
  entry: Entry,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  let newExcludedUsers = entry.exclude.filter((curId) => userId !== curId);
  const updatedEntry: Entry = { ...entry, exclude: newExcludedUsers };
  setEntries((entries) => {
    let entriesCopy = [...entries];
    entriesCopy[entries.indexOf(entry)] = updatedEntry;
    return entriesCopy;
  });
}

// Adds a new user.
export function addUser(
  firstName: string,
  lastName: string,
  email: string,
  setUsers: React.Dispatch<React.SetStateAction<{ [id: string]: User }>>
): void {
  // Input is valid! Add new user.
  const newUser: User = {
    id: nanoid(),
    firstName: firstName,
    lastName: lastName,
    initials: `${firstName.charAt(0).toLocaleUpperCase()}${lastName
      .charAt(0)
      .toLocaleUpperCase()}`,
    displayName: `${firstName} ${lastName}`,
    email: email,
  };
  setUsers((users) => {
    let usersCopy = { ...users };
    usersCopy[newUser.id] = newUser;
    return usersCopy;
  });
}

// Deletes a user and all of its entries.
export function deleteUser(
  userId: string,
  entries: Entry[],
  setUsers: React.Dispatch<React.SetStateAction<{ [id: string]: User }>>,
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
): void {
  // Delete user from user state.
  setUsers((users) => {
    let usersCopy = { ...users };
    delete usersCopy[userId];
    return usersCopy;
  });
  // Delete all entries associated with user from user state.
  let updatedEntries = entries.filter((entry) => entry.createdBy !== userId);

  // Removes user from excluded user lists.
  updatedEntries.forEach((entry, idx) => {
    if (entry.exclude.includes(userId)) {
      let newExcludedUsers = entry.exclude.filter((curId) => userId !== curId);
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
  excludedUsers?: string[],
  note?: string
) {
  const newItem: Entry = {
    id: nanoid(),
    item: !!item ? item : "",
    cost: !!cost ? cost : 0,
    exclude: !!excludedUsers ? excludedUsers : [],
    note: !!note ? note : "",
    createdBy: curUser.id,
  };
  setEntries((entries) => [...entries, newItem]);

  firestore.collection("sheets").add(newItem);
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
  users: { [id: string]: User }
): OverviewData {
  let overviewData: OverviewData = {};

  // Create entries for each user.
  Object.entries(users).forEach((pair) => {
    let user = pair[1];
    overviewData[user.id] = { totalSpent: 0, totalOwed: 0 };
  });

  entries.forEach((entry) => {
    overviewData[entry.createdBy].totalSpent += entry.cost;

    const validUsers = Object.keys(users).filter(
      (userId) => !entry.exclude.includes(userId)
    );
    const userCost = entry.cost / validUsers.length;

    validUsers.forEach((userId) => {
      if (userId !== entry.createdBy) {
        overviewData[userId].totalOwed += userCost;
      }
    });
  });

  return overviewData;
}

// Calculates and returns the breakdown data.
export function calculateUserBreakdown(
  user: User,
  entries: Entry[],
  users: { [id: string]: User }
): UserBreakdownData {
  let breakdownData: UserBreakdownData = {
    user: user,
    totalSpent: 0,
    totalOwed: 0,
    userBreakdown: {},
  };

  Object.entries(users).forEach((pair) => {
    let curUser = pair[1];
    if (curUser !== user) {
      breakdownData.userBreakdown[curUser.id] = { theyOwe: 0, youOwe: 0 };
    }
  });

  entries.forEach((entry) => {
    const numEntryUsers = Object.keys(users).length - entry.exclude.length;
    if (entry.createdBy === user.id) {
      // This is the current user's entry. Add the cost to totalSpent and
      // increment "theyOwe" for all valid users.
      breakdownData.totalSpent += entry.cost;

      const validUsers = Object.keys(users).filter(
        (userId) =>
          !entry.exclude.includes(userId) && userId !== entry.createdBy
      );
      validUsers.forEach((userId) => {
        breakdownData.userBreakdown[userId].theyOwe +=
          entry.cost / numEntryUsers;
      });
    } else if (!entry.exclude.includes(user.id)) {
      // This is another user's entry that you need to pay for. Add the cost to
      // totalOwed and increment "youOwe" for this particular user.
      breakdownData.totalOwed += entry.cost / numEntryUsers;
      breakdownData.userBreakdown[entry.createdBy].youOwe +=
        entry.cost / numEntryUsers;
    }
  });

  return breakdownData;
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
