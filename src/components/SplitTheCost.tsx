import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { OverviewGrid } from "./breakdown/OverviewGrid";
import { EntriesGrid } from "./entries/EntriesGrid";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { v4 as uuidv4 } from "uuid";

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

const entry1: Entry = {
  id: "fakeid1",
  item: "Hydroflask",
  cost: 35.99,
  note: "keeps ur water cold",
  exclude: [abigail],
  createdBy: jonathan,
};

const entry2: Entry = {
  id: "fakeid2",
  item: "canoe",
  cost: 65.95,
  note: "issa boat",
  exclude: [mom, dad],
  createdBy: abigail,
};

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [curUser, setCurUser] = useState<User>(jonathan);

  useEffect(() => {
    setUsers([jonathan, abigail, mom, dad]);
    setEntries([entry1, entry2]);
    setCurUser(jonathan);
    console.log(jonathan.toString());
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
      <div style={{ display: "flex" }}>
        <EntriesGrid
          entries={entries}
          setEntries={setEntries}
          curUser={curUser}
        />
        <OverviewGrid users={users} curUser={curUser} entries={entries} />
      </div>
    </div>
  );
};
