import React, { createContext, useContext, useEffect, useReducer } from "react";
import { SheetData } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddEntryModal } from "./modals/AddEntryModal";
import { SheetAction, sheetReducer } from "../actions/sheetActions";
import { UserContext } from "../App";
import { db, sheetDataConverter } from "../firebase";
import { useParams } from "react-router-dom";
import { WhoAreYouModal } from "./modals/WhoAreYouModal";

var initialSheetData: SheetData = {
  entries: [],
  users: {},
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
  const [sheetData, sheetDispatch] = useReducer(sheetReducer, initialSheetData);
  const { appUserData } = useContext(UserContext);

  const { sheetId } = useParams<{ sheetId: string }>();

  useEffect(() => {
    getSheetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getSheetData() {
    const sheetRef = await db
      .collection("sheets")
      .withConverter(sheetDataConverter)
      .doc(sheetId)
      .get();
    const testData = sheetRef.data();
    if (testData) {
      sheetDispatch({ type: "updateSheetData", sheetData: testData });
    }
  }

  return (
    <SheetContext.Provider
      value={{ sheetData: sheetData, sheetDispatch: sheetDispatch }}
    >
      <Header />
      <UsersBar />
      <Entries />
      <SideDialog />
      {!!appUserData.curUser && <AddEntryModal />}
      <WhoAreYouModal open={!appUserData.curUser} />
    </SheetContext.Provider>
  );
};
