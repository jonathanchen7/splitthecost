import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { db } from "../../firebase";
import { handleKeyPress } from "../../logic/logic";

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
  const [validTitle, setValidTitle] = useState(true);

  const [sheetLink, setSheetLink] = useState(
    sheetState.customLink ? sheetState.customLink : sheetState.id
  );
  const [editLink, setEditLink] = useState(false);
  const [validLink, setValidLink] = useState(true);
  const [uniqueLink, setUniqueLink] = useState(true);

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
    setUniqueLink(true);
    setSheetLink(sheetState.customLink ? sheetState.customLink : sheetState.id);
    setSaveState(SaveStates.Save);
    setOpen(false);
  }

  function handleCustomLinkClick() {
    if (!editLink) {
      setEditLink(true);
    } else {
      validateSheetLink();
    }
  }

  async function validateSheetLink(): Promise<Boolean> {
    if (sheetLink === sheetState.customLink || sheetLink === sheetState.id) {
      setEditLink(false);
      setValidLink(true);
      return true;
    }

    if (
      sheetLink.trim().length < 5 ||
      sheetLink.length > 20 ||
      !sheetLink.match(/^[0-9a-z]+$/)
    ) {
      setValidLink(false);
      return false;
    }

    const linkSnapshot = await db
      .collection("customLinks")
      .doc(sheetLink)
      .get();
    if (linkSnapshot.exists) {
      setValidLink(false);
      setUniqueLink(false);
      return false;
    }

    const idSnapshot = await db.collection("sheets").doc(sheetLink).get();
    if (idSnapshot.exists) {
      setValidLink(false);
      setUniqueLink(false);
      return false;
    }

    setSaveState(SaveStates.Save);
    setEditLink(false);
    setValidLink(true);
    setUniqueLink(true);

    return true;
  }

  function handleSheetTitleClick() {
    if (!editTitle) {
      setEditTitle(true);
    } else {
      validateSheetTitle();
    }
  }

  function validateSheetTitle() {
    if (sheetTitle === sheetState.title) {
      setEditTitle(false);
      setValidTitle(true);
      return true;
    }

    if (
      sheetTitle.trim().length < 5 ||
      sheetTitle.length > 20 ||
      sheetTitle.match(/[~`%^#@*+=\-[\]\\';,/{}|\\"<>]/)
    ) {
      setValidTitle(false);
      return false;
    }

    setSaveState(SaveStates.Save);
    setEditTitle(false);
    setValidTitle(true);

    return true;
  }

  async function saveSettings() {
    setSaveState(SaveStates.Saving);
    if (sheetTitle !== sheetState.title && validateSheetTitle()) {
      sheetDispatch({ type: "changeSheetTitle", title: sheetTitle });
    }

    if (sheetLink !== sheetState.id && sheetLink !== sheetState.customLink) {
      sheetDispatch({ type: "changeSheetLink", link: sheetLink });
    }
    await new Promise((r) => setTimeout(r, 500));
    setSaveState(SaveStates.Saved);
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='sm'
      onClose={handleClose}
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", saveSettings)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Settings' onClose={handleClose} />
      <DialogContent className='modalContent'>
        <Grid container spacing={0} alignItems='center'>
          <Grid item xs={8}>
            <TextField
              className='bottomMargin'
              fullWidth
              inputRef={(titleRef) => titleRef && editTitle && titleRef.focus()}
              value={sheetTitle}
              error={!validTitle}
              label='Sheet Title'
              onChange={(e) => setSheetTitle(e.target.value)}
              helperText={
                validTitle
                  ? ""
                  : "Title must be between 5-20 alphanumeric characters (select special characters are allowed)."
              }
              InputProps={{
                readOnly: !editTitle,
                disableUnderline: !editTitle,
              }}
            />
          </Grid>
          <Grid item xs={2} />
          <Grid container item xs={2} justify='flex-end'>
            <Button onClick={handleSheetTitleClick}>
              {editTitle ? "DONE" : "EDIT"}
            </Button>
          </Grid>
          {!sheetState.local && (
            <>
              <Grid item xs={8}>
                <TextField
                  className='bottomMargin'
                  fullWidth
                  inputRef={(linkRef) => linkRef && editLink && linkRef.focus()}
                  value={sheetLink}
                  error={!validLink}
                  label='Custom Sheet Link'
                  onChange={(e) => setSheetLink(e.target.value)}
                  helperText={
                    validLink
                      ? ""
                      : uniqueLink
                      ? "Link must be between 5-20 characters and contain only letters and numbers."
                      : "This custom link is already in use."
                  }
                  InputProps={{
                    readOnly: !editLink,
                    disableUnderline: !editLink,
                    startAdornment: <b>splitthecost.net/</b>,
                  }}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid container item xs={2} justify='flex-end'>
                <Button onClick={handleCustomLinkClick}>
                  {editLink ? "DONE" : "EDIT"}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
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
