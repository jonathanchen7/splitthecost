import React, { createContext, useContext, useEffect, useReducer } from "react";
import { SaveState, SheetState } from "../../models/models";
import { Entries } from "../entries/Entries";
import { Header } from "../header/Header";
import { UsersBar } from "../users/UsersBar";
import { SideDialog } from "../dialog/SideDialog";
import { AddItemFab } from "../bits/AddItemFab";
import { SheetAction, sheetReducer } from "../../actions/sheetActions";
import { UserContext } from "../../App";
import { db, sheetStateConverter } from "../../firebase";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { WhoAreYouModal } from "../modals/WhoAreYouModal";
import { nanoid } from "nanoid";
import { ViewOnDesktop } from "./ViewOnDesktop";
import { useState } from "react";

var initialSheetState: SheetState = {
  title: "Loading Sheet...",
  timestamp: "",
  lastAccessed: 0,
  lastEdited: 0,
  entries: [],
  users: {},
  numUsers: 0,
  createdBy: "",
  local: true,
  readOnly: true,
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
  const isMobile = window.innerWidth <= 1000;
  const history = useHistory();
  const location = useLocation<{ title: string }>();
  const { sheetId } = useParams<{ sheetId: string }>();

  const [sheetState, sheetDispatch] = useReducer(
    sheetReducer,
    initialSheetState
  );
  const { userState } = useContext(UserContext);

  const [autosaveState, setAutosaveState] = useState(
    sheetState.local ? SaveState.Unsaved : SaveState.Saved
  );

  useEffect(() => {
    if (!sheetId || sheetId === "new") {
      generateNewSheetState();
    } else {
      fetchSheetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAutosaveState(sheetState.local ? SaveState.Unsaved : SaveState.Saved);
    const saveInterval = setInterval(() => {
      autosaveSheet();
    }, 10000);

    return () => clearInterval(saveInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetState.local]);

  async function autosaveSheet() {
    if (!sheetState.local) {
      sheetDispatch({
        type: "autosaveSheet",
        setAutosaveState: setAutosaveState,
      });
      await new Promise((r) => setTimeout(r, 1500));
      setAutosaveState(SaveState.Saved);
    }
  }

  function generateNewSheetState() {
    if (!userState.curUser || !location.state.title) {
      history.push("/create");
      return;
    }

    const newSheetState: SheetState = {
      id: nanoid(10),
      timestamp: new Date(Date.now()).toUTCString(),
      lastAccessed: Date.now(),
      lastEdited: Date.now(),
      title: location.state.title,
      entries: [],
      users: { [userState.curUser.id]: userState.curUser },
      numUsers: 1,
      createdBy: userState.curUser.id,
      local: true,
      readOnly: false,
    };

    sheetDispatch({ type: "updateSheetState", sheetState: newSheetState });
    sheetDispatch({ type: "addEntry", createdBy: userState.curUser.id });
  }

  async function fetchSheetState() {
    const sheetSnapshot = await db
      .collection("sheets")
      .withConverter(sheetStateConverter)
      .doc(sheetId)
      .get();
    const fetchedSheetState = sheetSnapshot.data();
    if (fetchedSheetState) {
      sheetDispatch({
        type: "updateSheetState",
        sheetState: {
          ...fetchedSheetState,
          lastAccessed: Date.now(),
          readOnly: false,
        },
      });
      return;
    }

    const customLinkSnapshot = await db
      .collection("customLinks")
      .doc(sheetId)
      .get();

    const customLink = customLinkSnapshot.data();
    if (customLink) {
      const actualSheetId = customLink["sheetId"];
      const customSheetSnapshot = await db
        .collection("sheets")
        .withConverter(sheetStateConverter)
        .doc(actualSheetId)
        .get();
      const customFetchedSheetState = customSheetSnapshot.data();
      if (customFetchedSheetState) {
        sheetDispatch({
          type: "updateSheetState",
          sheetState: {
            ...customFetchedSheetState,
            lastAccessed: Date.now(),
          },
        });
        return;
      }
    }

    history.push({ pathname: "/invalidsheet", state: { sheetId: sheetId } });
  }

  function renderDeviceView(): JSX.Element {
    if (isMobile) {
      return <ViewOnDesktop />;
    } else {
      return (
        <>
          <Header saveState={autosaveState} />
          <UsersBar />
          <Entries />
          <SideDialog />
          {!sheetState.readOnly && userState.curUser && <AddItemFab />}
          <WhoAreYouModal open={!userState.curUser} />
        </>
      );
    }
  }

  return (
    <SheetContext.Provider
      value={{ sheetState: sheetState, sheetDispatch: sheetDispatch }}
    >
      {renderDeviceView()}
    </SheetContext.Provider>
  );
};
