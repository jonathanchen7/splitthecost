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
  timestamp: string;
  lastEdited: number;
  item: string;
  cost: number;
  exclude: string[];
  user: string;
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

export interface SheetState {
  id: string;
  timestamp: string;
  lastAccessed: number;
  lastEdited: number;
  title: string;
  entries: Entry[];
  users: { [userId: string]: User };
  numUsers: number;
  createdBy: string;
  local: boolean;
  customLink?: string;
}

export interface UserState {
  curUser: User | undefined;
  darkMode: boolean;
}
