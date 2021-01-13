import React, { useEffect } from "react";
import { useState } from "react";
import { Entry, User } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { v4 as uuidv4 } from "uuid";
import { SideDialog } from "./dialog/SideDialog";
import { AddItemModal } from "./modals/AddItemModal";
import { AuthPage } from "./auth/AuthPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";

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

const initialUsers: { [id: string]: User } = {};
initialUsers[jonathan.id] = jonathan;
initialUsers[abigail.id] = abigail;
initialUsers[mom.id] = mom;
initialUsers[dad.id] = dad;
initialUsers[emma.id] = emma;

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<{ [id: string]: User }>(initialUsers);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [curUser] = useState<User>(jonathan);

  // const [usersTest, setUsersTest] = useState<{ [id: string]: User }>({});
  // setUsersTest((usersTest) => {
  //   let usersTestCopy = { ...usersTest };
  //   usersTestCopy["test"] = curUser;
  //   return usersTestCopy;
  // });

  const [loggedIn] = useAuthState(auth);

  useEffect(() => {
    firestore.collection("sheets");
    setEntries([entry1, entry2, entry3]);
  }, []);

  return loggedIn ? (
    <>
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
    </>
  ) : (
    <AuthPage />
  );
};
