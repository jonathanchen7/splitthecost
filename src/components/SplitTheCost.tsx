import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { EntryGrid } from "./entries/EntryGrid";
import { Header } from "./header/Header";

const user1: User = {
  firstName: "Jonathan",
  lastName: "Chen",
  email: "jonathanschen28@gmail.com",
};
const user2: User = {
  firstName: "Abigail",
  lastName: "Chen",
  email: "abigail.chen@live.com",
};
const user3: User = {
  firstName: "Christine",
  lastName: "Liu",
  email: "thechens28@gmail.com",
};
const user4: User = {
  firstName: "Hongbo",
  lastName: "Chen",
  email: "bradchen28@gmail.com",
};

const entry1: Entry = {
  id: 0,
  item: "Hydroflask",
  cost: "$35.99",
  note: "keeps ur water cold",
  exclude: null,
};

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setUsers([user1, user2, user3, user4]);
    setEntries([entry1]);
  }, []);

  return (
    <div>
      <Header users={users} setUsers={setUsers} />
      <EntryGrid entries={entries} setEntries={setEntries} />
    </div>
  );
};
