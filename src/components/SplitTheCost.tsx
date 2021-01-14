import React, { createContext, useContext, useReducer } from "react";
import { SheetData } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddItemModal } from "./modals/AddItemModal";
import { SheetAction, sheetReducer } from "../actions/actions";
import { UserContext } from "../App";

const initialSheetData: SheetData = {
  entries: [],
  users: {
    testUser: {
      firstName: "Jonathan",
      lastName: "Chen",
      initials: "JC",
      id: "testUser",
      email: "jonathanschen28@gmail.com",
      displayName: "Jonathan Chen",
    },
  },
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
  const [sheetData, dispatch] = useReducer(sheetReducer, initialSheetData);
  const { curUser } = useContext(UserContext);
  console.log(curUser);

  return (
    <SheetContext.Provider
      value={{ sheetData: sheetData, sheetDispatch: dispatch }}
    >
      <Header />
      <UsersBar />
      <Entries />
      <AddItemModal />
      <SideDialog />
    </SheetContext.Provider>
  );
};
