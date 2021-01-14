import { nanoid } from "nanoid";
import {
  Entry,
  OverviewData,
  SheetData,
  User,
  UserBreakdownData,
} from "../models/models";
import { db } from "../firebase";

export type AddEntryAction = {
  type: "addEntry";
  createdBy: string;
  item?: string;
  cost?: number;
  exclude?: string[];
  note?: string;
};
export type RemoveEntryAction = {
  type: "removeEntry";
  entryId: string;
};
export type UpdateEntryAction = {
  type: "updateEntry";
  entry: Entry;
  section: "item" | "cost" | "note";
  value: string;
};
export type AddUserAction = {
  type: "addUser";
  firstName: string;
  lastName: string;
  email: string;
};
export type RemoveUserAction = {
  type: "removeUser";
  userId: string;
};
export type UpdateExcludedUsersAction = {
  type: "updateExcludedUsers";
  exclude: string[];
  entry: Entry;
};
export type RemoveExcludedUserAction = {
  type: "removeExcludedUser";
  userId: string;
  entry: Entry;
};

export type SheetAction =
  | AddEntryAction
  | RemoveEntryAction
  | UpdateEntryAction
  | AddUserAction
  | RemoveUserAction
  | UpdateExcludedUsersAction
  | RemoveExcludedUserAction;

export function sheetReducer(state: SheetData, action: SheetAction) {
  switch (action.type) {
    case "addEntry":
      return addEntryReduce(state, action);
    case "removeEntry":
      return removeEntryReduce(state, action);
    case "updateEntry":
      return updateEntryReduce(state, action);
    case "addUser":
      return addUserReduce(state, action);
    case "removeUser":
      return removeUserReduce(state, action);
    case "updateExcludedUsers":
      return updatedExcludedUsersReduce(state, action);
    case "removeExcludedUser":
      return removeExcludedUserReduce(state, action);
    default:
      return state;
  }
}

// Add a new entry to the sheet.
function addEntryReduce(state: SheetData, action: AddEntryAction): SheetData {
  const newEntry: Entry = {
    id: nanoid(),
    item: !!action.item ? action.item : "",
    cost: !!action.cost ? action.cost : 0,
    exclude: !!action.exclude ? action.exclude : [],
    note: !!action.note ? action.note : "",
    createdBy: action.createdBy,
  };
  return { ...state, entries: [...state.entries, newEntry] };
}

// Remove an entry from the sheet.
function removeEntryReduce(
  state: SheetData,
  action: RemoveEntryAction
): SheetData {
  const newEntries = state.entries.filter(
    (entry) => entry.id !== action.entryId
  );
  return { ...state, entries: newEntries };
}

// Remove an entry from the sheet.
function updateEntryReduce(
  state: SheetData,
  action: UpdateEntryAction
): SheetData {
  let newEntry: Entry;

  if (action.section === "item") {
    newEntry = { ...action.entry, item: action.value };
  } else if (action.section === "cost") {
    newEntry = { ...action.entry, cost: Number(action.value) };
  } else {
    newEntry = { ...action.entry, note: action.value };
  }

  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;
  return { ...state, entries: newEntries };
}

// Add a user to the sheet.
function addUserReduce(state: SheetData, action: AddUserAction): SheetData {
  const newUser: User = {
    id: nanoid(),
    firstName: action.firstName,
    lastName: action.lastName,
    initials: `${action.firstName.charAt(0)}${action.lastName.charAt(
      0
    )}`.toLocaleUpperCase(),
    displayName: `${action.firstName} ${action.lastName}`,
    email: action.email,
  };
  return { ...state, users: { ...state.users, [newUser.id]: newUser } };
}

// Remove a user from the sheet.
function removeUserReduce(
  state: SheetData,
  action: RemoveUserAction
): SheetData {
  // Remove user from users dictionary.
  const newUsers = { ...state.users };
  delete newUsers[action.userId];

  // Remove entries created by the user.
  const newEntries = state.entries.filter(
    (entry) => entry.createdBy !== action.userId
  );

  // Remove user from any excluded user lists.
  newEntries.forEach((entry, idx) => {
    if (entry.exclude.includes(action.userId)) {
      let newExcludedUsers = entry.exclude.filter(
        (curId) => action.userId !== curId
      );
      let updatedEntry = { ...entry, exclude: newExcludedUsers };
      newEntries[idx] = updatedEntry;
    }
  });

  return { ...state, entries: newEntries, users: newUsers };
}

// Update the excluded userIds for a specific entry.
function updatedExcludedUsersReduce(
  state: SheetData,
  action: UpdateExcludedUsersAction
): SheetData {
  const newEntry = {
    ...action.entry,
    exclude: action.exclude,
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;
  return { ...state, entries: newEntries };
}

// Remove an excluded user from a specific entry.
function removeExcludedUserReduce(
  state: SheetData,
  action: RemoveExcludedUserAction
): SheetData {
  const newEntry = {
    ...action.entry,
    exclude: action.entry.exclude.filter((userId) => userId !== action.userId),
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;
  return { ...state, entries: newEntries };
}

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
export function addUserBasic(
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

// Adds a new user.
export function addUser(
  user: User,
  setUsers: React.Dispatch<React.SetStateAction<{ [id: string]: User }>>
): void {
  setUsers((users) => {
    let usersCopy = { ...users };
    usersCopy[user.id] = user;
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

  db.collection("sheets").add(newItem);
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
