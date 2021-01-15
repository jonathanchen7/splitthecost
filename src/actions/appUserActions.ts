import { AppUserData, User } from "../models/models";

export type UpdateCurUserAction = {
  type: "updateCurUser";
  user: User;
};

export type SetDarkModeAction = {
  type: "setDarkMode";
  darkMode: boolean;
};

export type AppUserAction = UpdateCurUserAction | SetDarkModeAction;

export function appUserReducer(state: AppUserData, action: AppUserAction) {
  switch (action.type) {
    case "updateCurUser":
      return updateCurUser(state, action);
    case "setDarkMode":
      return setDarkMode(state, action);
    default:
      return state;
  }
}

// ----------------- APP USER ACTIONS -----------------

// Update the current user.
function updateCurUser(
  state: AppUserData,
  action: UpdateCurUserAction
): AppUserData {
  return { ...state, curUser: action.user };
}

// Remove an entry from the sheet.
function setDarkMode(
  state: AppUserData,
  action: SetDarkModeAction
): AppUserData {
  return { ...state, darkMode: action.darkMode };
}
