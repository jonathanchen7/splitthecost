import { UserState, User } from "../models/models";

export type UpdateCurUserAction = {
  type: "updateCurUser";
  user: User;
};

export type SetDarkModeAction = {
  type: "setDarkMode";
  darkMode: boolean;
};

export type SetAuthStatusAction = {
  type: "setAuthStatus";
  authenticated: boolean;
};

export type UserAction =
  | UpdateCurUserAction
  | SetDarkModeAction
  | SetAuthStatusAction;

export function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "updateCurUser":
      return updateCurUser(state, action);
    case "setDarkMode":
      return setDarkMode(state, action);
    case "setAuthStatus":
      return setAuthStatus(state, action);
    default:
      return state;
  }
}

// ----------------- APP USER ACTIONS -----------------

// Update the current user.
function updateCurUser(
  state: UserState,
  action: UpdateCurUserAction
): UserState {
  return { ...state, curUser: action.user };
}

// Remove an entry from the sheet.
function setDarkMode(state: UserState, action: SetDarkModeAction): UserState {
  return { ...state, darkMode: action.darkMode };
}

// Set the authentication status for the current sheet.
function setAuthStatus(
  state: UserState,
  action: SetAuthStatusAction
): UserState {
  return { ...state, authenticated: action.authenticated };
}
