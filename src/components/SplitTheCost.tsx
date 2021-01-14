import React, { createContext, useContext, useEffect, useReducer } from "react";
import { SheetData } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddEntryModal } from "./modals/AddEntryModal";
import { SheetAction, sheetReducer } from "../actions/actions";
import { UserContext } from "../App";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

const initialSheetData: SheetData = {
  entries: [],
  users: {
    testUser: {
      firstName: "Jonathan",
      lastName: "Chen",
      initials: "JC",
      id: "testUserId",
      email: "jonathanschen28@gmail.com",
      displayName: "Jonathan Chen",
    },
  },
  id: "testSheetId",
  createdBy: "testUserId",
  title: "New Sheet",
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
  console.log(curUser.displayName);

  const { sheetId } = useParams<{ sheetId: string }>();
  console.log(sheetId);

  useEffect(() => {
    getSheetData();
  }, [sheetId]);

  async function getSheetData() {
    const sheetRef = await db.collection("sheets").doc(sheetId).get();

    if (sheetRef) {
      console.log(sheetRef.data());
    }
  }

  return (
    <SheetContext.Provider
      value={{ sheetData: sheetData, sheetDispatch: dispatch }}
    >
      <Header />
      <UsersBar />
      <Entries />
      <AddEntryModal />
      <SideDialog />
    </SheetContext.Provider>
  );
};
