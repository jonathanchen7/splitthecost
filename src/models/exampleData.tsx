import { nanoid } from "nanoid";
import { Entry, User } from "./models";

// ----------------- USERS -----------------

const jonathan: User = {
  id: nanoid(),
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  displayName: "Jonathan Chen",
  email: "jonathanschen28@gmail.com",
};
const abigail: User = {
  id: nanoid(),
  firstName: "Abigail",
  lastName: "Chen",
  initials: "AC",
  email: "abigail.chen@live.com",
  displayName: "Abigail Chen",
};
const mom: User = {
  id: nanoid(),
  firstName: "Christine",
  lastName: "Liu",
  initials: "CL",
  displayName: "Christine Liu",
  email: "thechens28@gmail.com",
};
const dad: User = {
  id: nanoid(),
  firstName: "Hongbo",
  lastName: "Chen",
  initials: "HC",
  displayName: "Hongbo Chen",
  email: "bradchen28@gmail.com",
};
const emma: User = {
  id: nanoid(),
  firstName: "Emma",
  lastName: "Hutcheson",
  initials: "EH",
  displayName: "Emma Hutcheson",
  email: "emmahutch@hotmail.com",
};

// ----------------- ENTRIES -----------------

const entry1: Entry = {
  id: "fakeid1",
  item: "hydroflask",
  cost: 20,
  note: "keeps ur water cold",
  exclude: [abigail.id],
  createdBy: jonathan.id,
};

const entry2: Entry = {
  id: "fakeid2",
  item: "canoe",
  cost: 50,
  note: "issa boat",
  exclude: [mom.id],
  createdBy: abigail.id,
};

const entry3: Entry = {
  id: "",
  item: "",
  cost: 0,
  note: "",
  exclude: [],
  createdBy: jonathan.id,
};
