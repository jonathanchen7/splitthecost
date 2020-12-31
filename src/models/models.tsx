export interface User {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
}

export interface Entry {
  id: number;
  item: string;
  cost: string;
  exclude: User[] | null;
  createdBy: User;
  note: string;
}
