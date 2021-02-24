import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { db } from "../../firebase";
import { handleKeyPress } from "../../logic/logic";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useHistory } from "react-router-dom";

enum SaveState {
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
  const history = useHistory();

  const [sheetTitle, setSheetTitle] = useState(sheetState.title);
  const [editTitle, setEditTitle] = useState(false);
  const [validTitle, setValidTitle] = useState(true);

  const [sheetLink, setSheetLink] = useState(
    sheetState.customLink ? sheetState.customLink : sheetState.id
  );
  const [editLink, setEditLink] = useState(false);
  const [validLink, setValidLink] = useState(true);
  const [uniqueLink, setUniqueLink] = useState(true);

  const [readOnly, setReadOnly] = useState(sheetState.readOnly);

  const [deleteText, setDeleteText] = useState("");
  const [editDelete, setEditDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const [saveState, setSaveState] = useState(SaveState.Save);

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
    setSaveState(SaveState.Save);
    setOpen(false);
    setDeleteError(false);
    setDeleteText("");
    setEditDelete(false);
    setReadOnly(sheetState.readOnly);
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

    setSaveState(SaveState.Save);
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

    setSaveState(SaveState.Save);
    setEditTitle(false);
    setValidTitle(true);

    return true;
  }

  function handleReadOnly(e: React.ChangeEvent<HTMLInputElement>) {
    setSaveState(SaveState.Save);
    setReadOnly(e.target.checked);
  }

  function handleDeleteSheet() {
    if (!editDelete) {
      setEditDelete(true);
    } else {
      confirmDeleteSheet();
    }
  }

  function cancelDeleteSheet() {
    setDeleteError(false);
    setEditDelete(false);
    setDeleteText("");
  }

  async function confirmDeleteSheet() {
    if (deleteText !== sheetState.title) {
      setDeleteError(true);
      return;
    }

    sheetDispatch({ type: "deleteSheet" });
    await new Promise((r) => setTimeout(r, 500));
    history.push("/");
    setEditDelete(false);
  }

  async function saveSettings() {
    setSaveState(SaveState.Saving);
    if (sheetTitle !== sheetState.title && validateSheetTitle()) {
      sheetDispatch({ type: "changeSheetTitle", title: sheetTitle });
    }

    if (sheetLink !== sheetState.id && sheetLink !== sheetState.customLink) {
      sheetDispatch({ type: "changeSheetLink", link: sheetLink });
    }

    if (readOnly !== sheetState.readOnly) {
      sheetDispatch({ type: "updateReadOnly", readOnly: readOnly });
    }
    await new Promise((r) => setTimeout(r, 500));
    setSaveState(SaveState.Saved);
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
          <Grid className='bottomMargin' item xs={8}>
            <TextField
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
            <IconButton onClick={handleSheetTitleClick}>
              {editTitle ? <DoneRoundedIcon /> : <EditRoundedIcon />}
            </IconButton>
          </Grid>
          {!sheetState.local && (
            <>
              <Grid className='bottomMargin' item xs={8}>
                <TextField
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
                <IconButton onClick={handleCustomLinkClick}>
                  {editLink ? <DoneRoundedIcon /> : <EditRoundedIcon />}
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={readOnly}
                  onChange={handleReadOnly}
                  color='primary'
                />
              }
              label='Read Only'
            />
          </Grid>
          <Grid className='bottomMargin' item xs={8}>
            <TextField
              fullWidth
              inputRef={(deleteRef) =>
                deleteRef && editDelete && deleteRef.focus()
              }
              value={deleteText}
              placeholder='Enter sheet name to confirm deletion.'
              error={deleteError}
              label='Delete Sheet'
              onChange={(e) => setDeleteText(e.target.value)}
              helperText={
                deleteError
                  ? `Please enter the sheet name correctly (${sheetState.title})`
                  : ""
              }
              InputProps={{
                readOnly: !editDelete,
                disableUnderline: !editDelete,
              }}
            />
          </Grid>
          <Grid container item xs={4} justify='flex-end'>
            {editDelete && (
              <IconButton onClick={cancelDeleteSheet}>
                <CloseRoundedIcon />
              </IconButton>
            )}
            <IconButton onClick={handleDeleteSheet}>
              {editDelete ? <DoneRoundedIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          disabled={
            saveState === SaveState.Saving ||
            saveState === SaveState.Saved ||
            editLink ||
            editTitle
          }
          onClick={saveSettings}
        >
          {saveState === SaveState.Save
            ? "Save"
            : saveState === SaveState.Saving
            ? "Saving..."
            : "Saved"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
