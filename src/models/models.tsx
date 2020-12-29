export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Entry {
  id: number;
  item: string;
  cost: string;
  exclude: User[] | null;
  note: string;
}
