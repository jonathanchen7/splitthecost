import React, { createContext, useReducer } from "react";
import { SheetData } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddItemModal } from "./modals/AddItemModal";
import { SheetAction, sheetReducer } from "../actions/actions";

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
  const [sheetData, dispatch] = useReducer(sheetReducer, initialSheetData);

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
