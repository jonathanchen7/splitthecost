export interface User {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  displayName: string;
  email: string;
}

export interface Entry {
  id: string;
  item: string;
  cost: number;
  exclude: string[];
  createdBy: string;
  note: string;
}

export interface OverviewData {
  [userId: string]: { totalSpent: number; totalOwed: number };
}

export interface UserBreakdownData {
  user: User;
  totalSpent: number;
  totalOwed: number;
  userBreakdown: { [userId: string]: { youOwe: number; theyOwe: number } };
}

export interface SheetSettings {
  darkMode: boolean;
  viewOnly: boolean;
}

export interface SheetData {
  entries: Entry[];
  users: { [userId: string]: User };
  id: string;
  createdBy: string;
}

export interface AppUserData {
  curUser: User;
  darkMode: boolean;
}
