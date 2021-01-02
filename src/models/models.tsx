export interface User {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  entries: string[];
}

export interface Entry {
  id: string;
  item: string;
  cost: number;
  exclude: User[];
  createdBy: User;
  note: string;
}
