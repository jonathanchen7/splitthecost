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
import { useHistory, useLocation, useParams } from "react-router-dom";
import { WhoAreYouModal } from "./modals/WhoAreYouModal";
import { nanoid } from "nanoid";

var initialSheetData: SheetData = {
  title: "Loading Sheet...",
  entries: [],
  users: {},
  numUsers: 0,
  createdBy: "",
  local: false,
  id: "",
};

export const SheetContext = createContext<{
  sheetData: SheetData;
  sheetDispatch: React.Dispatch<SheetAction>;
}>({
  sheetData: initialSheetData,
  sheetDispatch: () => null,
});

export const SplitTheCost: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ title: string }>();
  const { sheetId } = useParams<{ sheetId: string }>();

  const [sheetData, sheetDispatch] = useReducer(sheetReducer, initialSheetData);
  const { appUserData } = useContext(UserContext);

  useEffect(() => {
    if (!sheetId || sheetId === "new") {
      generateNewSheetData();
    } else {
      fetchSheetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateNewSheetData() {
    if (!appUserData.curUser || !location.state.title) {
      history.push("/create");
      return;
    }

    const newSheetData: SheetData = {
      title: location.state.title,
      entries: [],
      users: { [appUserData.curUser.id]: appUserData.curUser },
      numUsers: 0,
      createdBy: appUserData.curUser.id,
      local: true,
      id: nanoid(10),
    };

    sheetDispatch({ type: "updateSheetData", sheetData: newSheetData });
    sheetDispatch({ type: "addEntry", createdBy: appUserData.curUser.id });
  }

  async function fetchSheetData() {
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
