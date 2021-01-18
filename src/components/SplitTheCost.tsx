import React, { createContext, useContext, useEffect, useReducer } from "react";
import { SheetState } from "../models/models";
import { Entries } from "./entries/Entries";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { SideDialog } from "./dialog/SideDialog";
import { AddEntryModal } from "./modals/AddEntryModal";
import { SheetAction, sheetReducer } from "../actions/sheetActions";
import { UserContext } from "../App";
import { db, sheetStateConverter } from "../firebase";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { WhoAreYouModal } from "./modals/WhoAreYouModal";
import { nanoid } from "nanoid";

var initialSheetState: SheetState = {
  title: "Loading Sheet...",
  entries: [],
  users: {},
  numUsers: 0,
  createdBy: "",
  local: false,
  id: "",
};

export const SheetContext = createContext<{
  sheetState: SheetState;
  sheetDispatch: React.Dispatch<SheetAction>;
}>({
  sheetState: initialSheetState,
  sheetDispatch: () => null,
});

export const SplitTheCost: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ title: string }>();
  const { sheetId } = useParams<{ sheetId: string }>();

  const [sheetState, sheetDispatch] = useReducer(
    sheetReducer,
    initialSheetState
  );
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (!sheetId || sheetId === "new") {
      generateNewSheetState();
    } else {
      fetchSheetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateNewSheetState() {
    if (!userState.curUser || !location.state.title) {
      history.push("/create");
      return;
    }

    const newSheetState: SheetState = {
      title: location.state.title,
      entries: [],
      users: { [userState.curUser.id]: userState.curUser },
      numUsers: 1,
      createdBy: userState.curUser.id,
      local: true,
      id: nanoid(10),
    };

    sheetDispatch({ type: "updateSheetState", sheetState: newSheetState });
    sheetDispatch({ type: "addEntry", createdBy: userState.curUser.id });
  }

  async function fetchSheetState() {
    const sheetRef = await db
      .collection("sheets")
      .withConverter(sheetStateConverter)
      .doc(sheetId)
      .get();
    const testData = sheetRef.data();
    if (testData) {
      sheetDispatch({ type: "updateSheetState", sheetState: testData });
    }
  }

  return (
    <SheetContext.Provider
      value={{ sheetState: sheetState, sheetDispatch: sheetDispatch }}
    >
      <Header />
      <UsersBar />
      <Entries />
      <SideDialog />
      {!!userState.curUser && <AddEntryModal />}
      <WhoAreYouModal open={!userState.curUser} />
    </SheetContext.Provider>
  );
};
