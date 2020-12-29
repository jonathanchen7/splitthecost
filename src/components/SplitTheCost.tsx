import React from "react";
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

var test = [user1, user2, user3, user4];

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  // setUsers([user1, user2, user3, user4]);

  return (
    <div>
      <Header users={test} setUsers={setUsers} />
      <EntryGrid entries={entries} setEntries={setEntries} />
    </div>
  );
};
