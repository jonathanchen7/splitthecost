import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { db } from "../../firebase";

enum SaveStates {
  Save = 1,
  Saving = 2,
  Saved = 3,
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [sheetTitle, setSheetTitle] = useState(sheetState.title);
  const [editTitle, setEditTitle] = useState(false);

  const [sheetLink, setSheetLink] = useState(
    sheetState.customLink ? sheetState.customLink : sheetState.id
  );
  const [editLink, setEditLink] = useState(false);
  const [validLink, setValidLink] = useState(true);

  const [saveState, setSaveState] = useState(SaveStates.Save);

  useEffect(() => {
    setSheetTitle(sheetState.title);
    setSheetLink(sheetState.customLink ? sheetState.customLink : sheetState.id);
  }, [sheetState.title, sheetState.customLink, sheetState.id]);

  function handleClose() {
    setEditTitle(false);
    setSheetTitle(sheetState.title);
    setEditLink(false);
    setValidLink(true);
    setSheetLink(sheetState.customLink ? sheetState.customLink : sheetState.id);
    setSaveState(SaveStates.Save);
    setOpen(false);
  }

  async function validateSheetLink(link: string): Promise<Boolean> {
    if (link.trim().length < 5 || link.length > 15) {
      setValidLink(false);
      return false;
    }

    const linkSnapshot = await db
      .collection("customLinks")
      .doc(sheetLink)
      .get();
    if (linkSnapshot.exists) {
      setValidLink(false);
      return false;
    }

    return true;
  }

  async function saveSettings() {
    setSaveState(SaveStates.Saving);
    if (sheetTitle !== sheetState.title) {
      sheetDispatch({ type: "changeSheetTitle", title: sheetTitle });
    }

    if (sheetLink !== sheetState.id && sheetLink !== sheetState.customLink) {
      if (await validateSheetLink(sheetLink)) {
        sheetDispatch({ type: "changeSheetLink", link: sheetLink });
      }
    }
    await new Promise((r) => setTimeout(r, 500));
    setSaveState(SaveStates.Saved);
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Settings' onClose={handleClose} />
      <DialogContent className='settingsModalContent'>
        <div className='settingsRow'>
          <b>Sheet Title: </b>
          <Input
            className='leftMargin'
            inputRef={(titleRef) => titleRef && editTitle && titleRef.focus()}
            readOnly={!editTitle}
            disableUnderline={!editTitle}
            value={sheetTitle}
            onChange={(e) => setSheetTitle(e.target.value)}
          />
          <Button
            onClick={() => {
              setEditTitle(!editTitle);
              setSaveState(SaveStates.Save);
            }}
          >
            {editTitle ? "DONE" : "EDIT"}
          </Button>
        </div>
        <div className='settingsRow'>
          <b>Custom Link: </b>
          <Input
            className='leftMargin settingsLinkInput'
            inputRef={(linkRef) => linkRef && editLink && linkRef.focus()}
            readOnly={!editLink}
            disableUnderline={!editLink}
            value={sheetLink}
            error={!validLink}
            startAdornment={<b>splitthecost.com/</b>}
            onChange={(e) => setSheetLink(e.target.value)}
          />
          <Button
            onClick={() => {
              setEditLink(!editLink);
              setSaveState(SaveStates.Save);
            }}
          >
            {editLink ? "DONE" : "EDIT"}
          </Button>
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          disabled={
            saveState === SaveStates.Saving ||
            saveState === SaveStates.Saved ||
            editLink ||
            editTitle
          }
          onClick={saveSettings}
        >
          {saveState === SaveStates.Save
            ? "Save"
            : saveState === SaveStates.Saving
            ? "Saving..."
            : "Saved"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
