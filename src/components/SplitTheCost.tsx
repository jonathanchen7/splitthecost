import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { addEntry } from "../actions/actions";
import { SideDialog } from "./dialog/SideDialog";

const jonathan: User = {
  id: uuidv4(),
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  email: "jonathanschen28@gmail.com",
  entries: ["fakeid1"],
};
const abigail: User = {
  id: uuidv4(),
  firstName: "Abigail",
  lastName: "Chen",
  initials: "AC",
  email: "abigail.chen@live.com",
  entries: ["fakeid2"],
};
const mom: User = {
  id: uuidv4(),
  firstName: "Christine",
  lastName: "Liu",
  initials: "CL",
  email: "thechens28@gmail.com",
  entries: [],
};
const dad: User = {
  id: uuidv4(),
  firstName: "Hongbo",
  lastName: "Chen",
  initials: "HC",
  email: "bradchen28@gmail.com",
  entries: [],
};
const emma: User = {
  id: uuidv4(),
  firstName: "Emma",
  lastName: "Hutcheson",
  initials: "EH",
  email: "emmahutch@hotmail.com",
  entries: [],
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
  }, []);

  return (
    <div>
      <Header curUser={curUser} />
      <UsersBar
        users={users}
        curUser={curUser}
        setUsers={setUsers}
        setEntries={setEntries}
      />
      <Entries entries={entries} setEntries={setEntries} curUser={curUser} />
      <div className='addItemFabDiv'>
        <Fab
          variant='extended'
          size='medium'
          onClick={() => addEntry(curUser, setEntries)}
        >
          <AddIcon />
          <span className='buttonText'>Add Item</span>
        </Fab>
      </div>
      <SideDialog curUser={curUser} users={users} entries={entries} />
    </div>
  );
};
