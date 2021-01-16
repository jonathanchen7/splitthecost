import { nanoid } from "nanoid";
import { db, sheetDataConverter } from "../firebase";
import {
  Entry,
  OverviewData,
  SheetData,
  User,
  UserBreakdownData,
} from "../models/models";

export type AddEntryAction = {
  type: "addEntry";
  createdBy: string;
  item?: string;
  cost?: number;
  exclude?: string[];
  note?: string;
  local?: boolean;
};
export type RemoveEntryAction = {
  type: "removeEntry";
  entryId: string;
  local?: boolean;
};
export type UpdateEntryAction = {
  type: "updateEntry";
  entry: Entry;
  section: "item" | "cost" | "note";
  value: string;
  local?: boolean;
};
export type AddUserAction = {
  type: "addUser";
  firstName: string;
  lastName: string;
  email: string;
  local?: boolean;
};
export type RemoveUserAction = {
  type: "removeUser";
  userId: string;
  local?: boolean;
};
export type UpdateExcludedUsersAction = {
  type: "updateExcludedUsers";
  exclude: string[];
  entry: Entry;
  local?: boolean;
};
export type RemoveExcludedUserAction = {
  type: "removeExcludedUser";
  userId: string;
  entry: Entry;
  local?: boolean;
};
export type SaveSheetAction = {
  type: "saveSheet";
};
export type UpdateSheetDataAction = {
  type: "updateSheetData";
  sheetData: SheetData;
};

export type SheetAction =
  | AddEntryAction
  | RemoveEntryAction
  | UpdateEntryAction
  | AddUserAction
  | RemoveUserAction
  | UpdateExcludedUsersAction
  | RemoveExcludedUserAction
  | SaveSheetAction
  | UpdateSheetDataAction;

export function sheetReducer(state: SheetData, action: SheetAction) {
  switch (action.type) {
    case "addEntry":
      return addEntry(state, action);
    case "removeEntry":
      return removeEntry(state, action);
    case "updateEntry":
      return updateEntry(state, action);
    case "addUser":
      return addUser(state, action);
    case "removeUser":
      return removeUser(state, action);
    case "updateExcludedUsers":
      return updatedExcludedUsers(state, action);
    case "removeExcludedUser":
      return removeExcludedUser(state, action);
    case "saveSheet":
      return saveSheet(state, action);
    case "updateSheetData":
      return action.sheetData;
    default:
      return state;
  }
}

// ----------------- SHEET ACTIONS -----------------

// Add a new entry to the sheet.
function addEntry(state: SheetData, action: AddEntryAction): SheetData {
  const newEntry: Entry = {
    id: nanoid(),
    item: !!action.item ? action.item : "",
    cost: !!action.cost ? action.cost : 0,
    exclude: !!action.exclude ? action.exclude : [],
    note: !!action.note ? action.note : "",
    createdBy: action.createdBy,
  };

  const newSheetState = {
    ...state,
    entries: [...state.entries, newEntry],
  };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove an entry from the sheet.
function removeEntry(state: SheetData, action: RemoveEntryAction): SheetData {
  const newEntries = state.entries.filter(
    (entry) => entry.id !== action.entryId
  );

  const newSheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Update a section of an entry.
function updateEntry(state: SheetData, action: UpdateEntryAction): SheetData {
  const entry = action.entry;
  const value = action.value;
  let newEntry: Entry;

  if (action.section === "item") {
    if (entry.item === value) return state;
    newEntry = { ...entry, item: value };
  } else if (action.section === "cost") {
    if (entry.cost === Number(value)) return state;
    newEntry = { ...entry, cost: Number(value) };
  } else {
    if (entry.note === value) return state;
    newEntry = { ...entry, note: value };
  }
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(entry)] = newEntry;

  const newSheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Add a user to the sheet.
function addUser(state: SheetData, action: AddUserAction): SheetData {
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

  const newSheetState = {
    ...state,
    users: { ...state.users, [newUser.id]: newUser },
  };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove a user from the sheet.
function removeUser(state: SheetData, action: RemoveUserAction): SheetData {
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

  const newSheetState = { ...state, entries: newEntries, users: newUsers };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Update the excluded userIds for a specific entry.
function updatedExcludedUsers(
  state: SheetData,
  action: UpdateExcludedUsersAction
): SheetData {
  const newEntry = {
    ...action.entry,
    exclude: action.exclude,
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;

  const newSheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove an excluded user from a specific entry.
function removeExcludedUser(
  state: SheetData,
  action: RemoveExcludedUserAction
): SheetData {
  const newEntry = {
    ...action.entry,
    exclude: action.entry.exclude.filter((userId) => userId !== action.userId),
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;

  const newSheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

function saveSheet(state: SheetData, action: SaveSheetAction): SheetData {
  const newSheetState = { ...state, local: false };
  updateFirestore(newSheetState);
  return newSheetState;
}

function updateFirestore(state: SheetData, local?: boolean) {
  if (local || state.local) return;

  db.collection("sheets")
    .withConverter(sheetDataConverter)
    .doc(state.id)
    .set(state);
}

// ----------------- CALCULATIONS -----------------

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
