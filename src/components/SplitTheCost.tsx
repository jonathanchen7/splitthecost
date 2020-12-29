import React from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <div>
      <Header />
      <Entries />
    </div>
  );
};
