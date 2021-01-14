import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { Entry, SheetData, User } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddItemModal } from "./modals/AddItemModal";
import { UserInfoModal } from "./modals/UserInfoModal";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import { SheetAction, sheetReducer } from "../actions/actions";

const jonathan: User = {
  id: "testUser",
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  displayName: "Jonathan Chen",
  email: "jonathanschen28@gmail.com",
};

const initialSheetData: SheetData = {
  entries: [],
  users: {},
  id: "test",
  createdBy: "testUser",
};

export const SheetContext = createContext<{
  sheetData: SheetData;
  sheetDispatch: React.Dispatch<SheetAction>;
}>({
  sheetData: initialSheetData,
  sheetDispatch: () => null,
});

export const SplitTheCost: React.FC = () => {
  const { curUser } = useContext(UserContext);

  const [sheetData, dispatch] = useReducer(sheetReducer, initialSheetData);

  const [users, setUsers] = useState<{ [id: string]: User }>({});
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <SheetContext.Provider
      value={{ sheetData: sheetData, sheetDispatch: dispatch }}
    >
      <Header />
      <UsersBar />
      <Entries
        entries={sheetData.entries}
        users={sheetData.users}
        setEntries={setEntries}
      />
      <AddItemModal
        curUser={curUser}
        users={sheetData.users}
        setEntries={setEntries}
      />
      <SideDialog
        curUser={curUser}
        users={sheetData.users}
        entries={sheetData.entries}
      />
    </SheetContext.Provider>
  );
};
