import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { v4 as uuidv4 } from "uuid";
import { SideDialog } from "./dialog/SideDialog";
import { AddItemModal } from "./modals/AddItemModal";
import { addUser } from "../actions/actions";

const jonathan: User = {
  id: uuidv4(),
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  displayName: "Jonathan Chen",
  email: "jonathanschen28@gmail.com",
};
const abigail: User = {
  id: uuidv4(),
  firstName: "Abigail",
  lastName: "Chen",
  initials: "AC",
  email: "abigail.chen@live.com",
  displayName: "Abigail Chen",
};
const mom: User = {
  id: uuidv4(),
  firstName: "Christine",
  lastName: "Liu",
  initials: "CL",
  displayName: "Christine Liu",
  email: "thechens28@gmail.com",
};
const dad: User = {
  id: uuidv4(),
  firstName: "Hongbo",
  lastName: "Chen",
  initials: "HC",
  displayName: "Hongbo Chen",
  email: "bradchen28@gmail.com",
};
const emma: User = {
  id: uuidv4(),
  firstName: "Emma",
  lastName: "Hutcheson",
  initials: "EH",
  displayName: "Emma Hutcheson",
  email: "emmahutch@hotmail.com",
};

const entry1: Entry = {
  id: "fakeid1",
  item: "hydroflask",
  cost: 20,
  note: "keeps ur water cold",
  exclude: [abigail],
  createdBy: jonathan,
};

const entry2: Entry = {
  id: "fakeid2",
  item: "canoe",
  cost: 50,
  note: "issa boat",
  exclude: [mom],
  createdBy: abigail,
};

const entry3: Entry = {
  id: "",
  item: "",
  cost: 0,
  note: "",
  exclude: [],
  createdBy: jonathan,
};

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [curUser, setCurUser] = useState<User>(jonathan);

  useEffect(() => {
    setUsers([jonathan, abigail, mom, dad, emma]);
    setEntries([entry1, entry2, entry3]);
    setCurUser(jonathan);
    addUser("test", "testtest", "test@gmail.com", setUsers);
  }, []);

  return (
    <div>
      <Header curUser={curUser} />
      <UsersBar
        users={users}
        entries={entries}
        curUser={curUser}
        setUsers={setUsers}
        setEntries={setEntries}
      />
      <Entries
        entries={entries}
        users={users}
        setEntries={setEntries}
        curUser={curUser}
      />
      <AddItemModal curUser={curUser} users={users} setEntries={setEntries} />
      <SideDialog curUser={curUser} users={users} entries={entries} />
    </div>
  );
};
