import { nanoid } from "nanoid";
import { db, sheetStateConverter } from "../firebase";
import { Entry, SheetState, User } from "../models/models";

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
export type ChangeSheetTitleAction = {
  type: "changeSheetTitle";
  title: string;
};
export type ChangeSheetLinkAction = {
  type: "changeSheetLink";
  link: string;
};
export type SaveSheetAction = {
  type: "saveSheet";
};
export type UpdateSheetStateAction = {
  type: "updateSheetState";
  sheetState: SheetState;
};

export type SheetAction =
  | AddEntryAction
  | RemoveEntryAction
  | UpdateEntryAction
  | AddUserAction
  | RemoveUserAction
  | UpdateExcludedUsersAction
  | RemoveExcludedUserAction
  | ChangeSheetTitleAction
  | ChangeSheetLinkAction
  | SaveSheetAction
  | UpdateSheetStateAction;

export function sheetReducer(state: SheetState, action: SheetAction) {
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
    case "changeSheetTitle":
      return changeSheetTitle(state, action);
    case "changeSheetLink":
      return changeSheetLink(state, action);
    case "saveSheet":
      return saveSheet(state, action);
    case "updateSheetState":
      return action.sheetState;
    default:
      return state;
  }
}

// ----------------- SHEET ACTIONS -----------------

// Add a new entry to the sheet.
function addEntry(state: SheetState, action: AddEntryAction): SheetState {
  const newEntry: Entry = {
    id: nanoid(),
    item: action.item ? action.item : "",
    cost: action.cost ? action.cost : 0,
    exclude: action.exclude ? action.exclude : [],
    note: action.note ? action.note : "",
    createdBy: action.createdBy,
  };

  const newSheetState: SheetState = {
    ...state,
    entries: [...state.entries, newEntry],
  };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove an entry from the sheet.
function removeEntry(state: SheetState, action: RemoveEntryAction): SheetState {
  const newEntries = state.entries.filter(
    (entry) => entry.id !== action.entryId
  );

  const newSheetState: SheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Update a section of an entry.
function updateEntry(state: SheetState, action: UpdateEntryAction): SheetState {
  const entry = action.entry;
  const value = action.value;
  let newEntry: Entry;

  if (action.section === "item") {
    if (entry.item === value) return state;
    newEntry = { ...entry, item: value };
  } else if (action.section === "cost") {
    newEntry = { ...entry, cost: Number(value) };
  } else {
    if (entry.note === value) return state;
    newEntry = { ...entry, note: value };
  }
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(entry)] = newEntry;

  const newSheetState: SheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Add a user to the sheet.
function addUser(state: SheetState, action: AddUserAction): SheetState {
  if (state.numUsers >= 10) return state;

  let duplicateUser = false;
  Object.entries(state.users).forEach((pair) => {
    const user = pair[1];
    if (
      user.firstName === action.firstName &&
      user.lastName === action.lastName
    ) {
      duplicateUser = true;
    }
  });

  if (duplicateUser) return state;

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

  const newSheetState: SheetState = {
    ...state,
    users: { ...state.users, [newUser.id]: newUser },
    numUsers: state.numUsers + 1,
  };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove a user from the sheet.
function removeUser(state: SheetState, action: RemoveUserAction): SheetState {
  if (state.numUsers === 1) return state;

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

  const newSheetState: SheetState = {
    ...state,
    entries: newEntries,
    users: newUsers,
    numUsers: state.numUsers - 1,
  };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Update the excluded userIds for a specific entry.
function updatedExcludedUsers(
  state: SheetState,
  action: UpdateExcludedUsersAction
): SheetState {
  const newEntry = {
    ...action.entry,
    exclude: action.exclude,
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;

  const newSheetState: SheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Remove an excluded user from a specific entry.
function removeExcludedUser(
  state: SheetState,
  action: RemoveExcludedUserAction
): SheetState {
  const newEntry = {
    ...action.entry,
    exclude: action.entry.exclude.filter((userId) => userId !== action.userId),
  };
  const newEntries = [...state.entries];
  newEntries[newEntries.indexOf(action.entry)] = newEntry;

  const newSheetState: SheetState = { ...state, entries: newEntries };
  updateFirestore(newSheetState, action.local);
  return newSheetState;
}

// Update the sheet's title.
function changeSheetTitle(
  state: SheetState,
  action: ChangeSheetTitleAction
): SheetState {
  if (state.title === action.title) return state;

  const newSheetState: SheetState = { ...state, title: action.title };
  updateFirestore(newSheetState);
  return newSheetState;
}

// Update the sheet's custom link.
function changeSheetLink(
  state: SheetState,
  action: ChangeSheetLinkAction
): SheetState {
  if (
    !action.link ||
    state.customLink === action.link ||
    action.link.length < 5
  )
    return state;

  const newSheetState: SheetState = { ...state, customLink: action.link };
  updateFirestore(newSheetState);

  if (state.customLink) {
    db.collection("customLinks").doc(state.customLink).delete();
  }

  const firebaseLink = { sheetId: state.id };
  db.collection("customLinks").doc(action.link).set(firebaseLink);
  return newSheetState;
}

// Save the sheet in Firestore and set the sheet to auto-update.
function saveSheet(state: SheetState, action: SaveSheetAction): SheetState {
  if (!state.local) return state;

  const newSheetState = { ...state, local: false };
  updateFirestore(newSheetState);
  return newSheetState;
}

function updateFirestore(state: SheetState, local?: boolean) {
  if (local || state.local) return;

  db.collection("sheets")
    .withConverter(sheetStateConverter)
    .doc(state.id)
    .set(state);
}
