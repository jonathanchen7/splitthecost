import * as React from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { db } from "../../firebase";
import {
  validateCustomSheetLink,
  validatePassword,
  validateSheetTitle,
} from "../../logic/logic";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import FilterNoneRoundedIcon from "@material-ui/icons/FilterNoneRounded";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);
  const history = useHistory();

  // Sheet title state
  const [sheetTitle, setSheetTitle] = useState(sheetState.title);
  const [editTitle, setEditTitle] = useState(false);
  const [validTitle, setValidTitle] = useState(true);

  // Custom sheet link state
  const [sheetLink, setSheetLink] = useState(
    sheetState.customLink ? sheetState.customLink : sheetState.id
  );
  const [editLink, setEditLink] = useState(false);
  const [validLink, setValidLink] = useState(true);
  const [uniqueLink, setUniqueLink] = useState(true);

  // Read only state
  const [readOnly, setReadOnly] = useState(sheetState.readOnly);

  // Sheet password state
  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);

  const [password2, setPassword2] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Delete sheet state
  const [deleteText, setDeleteText] = useState("");
  const [editDelete, setEditDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    setSheetTitle(sheetState.title);
    setSheetLink(sheetState.customLink ? sheetState.customLink : sheetState.id);
    setReadOnly(sheetState.readOnly);
  }, [
    sheetState.title,
    sheetState.customLink,
    sheetState.id,
    sheetState.readOnly,
  ]);

  function handleClose() {
    setOpen(false);
    cancelSheetTitle();
    cancelCustomLink();
    cancelPassword();
    cancelDeleteSheet();
  }

  // ----------------- SHEET TITLE -----------------

  function renderSheetTitleSetting(): JSX.Element {
    return (
      <>
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
                : "Title must be between 3-40 characters (select special characters are allowed)."
            }
            InputProps={{
              readOnly: !editTitle,
              disableUnderline: !editTitle,
            }}
          />
        </Grid>
        <Grid container item xs={4} justify='flex-end'>
          {editTitle && (
            <IconButton onClick={cancelSheetTitle}>
              <CloseRoundedIcon />
            </IconButton>
          )}
          <IconButton onClick={handleEditSheetTitle}>
            {editTitle ? <DoneRoundedIcon /> : <EditRoundedIcon />}
          </IconButton>
        </Grid>
      </>
    );
  }

  function handleEditSheetTitle() {
    if (!editTitle) {
      setEditTitle(true);
    } else {
      confirmSheetTitle();
    }
  }

  function confirmSheetTitle() {
    if (sheetTitle.trim() === sheetState.title) {
      cancelSheetTitle();
      return;
    }

    if (!validateSheetTitle(sheetTitle.trim())) {
      setValidTitle(false);
      return;
    }

    setEditTitle(false);
    setValidTitle(true);
    sheetDispatch({ type: "changeSheetTitle", title: sheetTitle.trim() });
  }

  function cancelSheetTitle() {
    setEditTitle(false);
    setValidTitle(true);
    setSheetTitle(sheetState.title);
  }

  // ----------------- CUSTOM SHEET LINK -----------------

  function renderCustomLinkSetting(): JSX.Element {
    return (
      <>
        <Grid className='bottomMargin' item xs={8}>
          <TextField
            fullWidth
            inputRef={(linkRef) => linkRef && editLink && linkRef.focus()}
            value={sheetLink}
            error={!validLink || !uniqueLink}
            label='Custom Sheet Link'
            onChange={(e) => setSheetLink(e.target.value)}
            helperText={
              validLink
                ? uniqueLink
                  ? ""
                  : "This custom link is already in use."
                : "Link must be between 5-20 characters and contain only letters and numbers."
            }
            InputProps={{
              readOnly: !editLink,
              disableUnderline: !editLink,
              startAdornment: <b>splitthecost.net/#/</b>,
            }}
          />
        </Grid>
        <Grid container item xs={4} justify='flex-end'>
          <Tooltip arrow title='Copy Link' placement='left'>
            <IconButton onClick={copySheetLink}>
              <FilterNoneRoundedIcon />
            </IconButton>
          </Tooltip>
          {editLink && (
            <IconButton onClick={cancelCustomLink}>
              <CloseRoundedIcon />
            </IconButton>
          )}
          <IconButton onClick={handleEditCustomLink}>
            {editLink ? <DoneRoundedIcon /> : <EditRoundedIcon />}
          </IconButton>
        </Grid>
      </>
    );
  }

  function handleEditCustomLink() {
    if (!editLink) {
      setEditLink(true);
    } else {
      confirmCustomLink();
    }
  }

  async function confirmCustomLink() {
    const linkTrimmed = sheetLink.trim();
    if (
      linkTrimmed === sheetState.customLink ||
      linkTrimmed === sheetState.id
    ) {
      cancelCustomLink();
      return;
    }

    const temp = validateCustomSheetLink(linkTrimmed);
    setValidLink(temp);
    if (!temp) {
      return;
    }

    const linkSnapshot = await db
      .collection("customLinks")
      .doc(linkTrimmed)
      .get();
    if (linkSnapshot.exists) {
      setUniqueLink(false);
      return;
    }

    const idSnapshot = await db.collection("sheets").doc(linkTrimmed).get();
    if (idSnapshot.exists) {
      setUniqueLink(false);
      return;
    }

    setEditLink(false);
    setValidLink(true);
    setUniqueLink(true);
    sheetDispatch({ type: "changeSheetLink", link: linkTrimmed });
    history.push(`/sheet/${sheetLink}`);
  }

  function cancelCustomLink() {
    setEditLink(false);
    setValidLink(true);
    setUniqueLink(true);
    setSheetLink(sheetState.customLink ? sheetState.customLink : sheetState.id);
  }

  function copySheetLink() {
    navigator.clipboard.writeText(
      `splitthecost.net/#/sheet/${
        sheetState.customLink ? sheetState.customLink : sheetState.id
      }`
    );
  }

  // ----------------- TOGGLES -----------------

  function renderToggleSettings(): JSX.Element {
    return (
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={readOnly}
              onChange={handleEditReadOnly}
              color='primary'
            />
          }
          label='Read Only'
        />
      </Grid>
    );
  }

  function handleEditReadOnly(e: React.ChangeEvent<HTMLInputElement>) {
    sheetDispatch({ type: "updateReadOnly", readOnly: e.target.checked });
  }

  // ----------------- SHEET PASSWORD -----------------

  function renderSheetPasswordSetting(): JSX.Element {
    return (
      <>
        <Grid className='bottomMargin' item xs={8}>
          <TextField
            fullWidth
            value={password}
            error={!validPassword}
            label='Sheet Password'
            placeholder='Enter new sheet password here'
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              validPassword
                ? ""
                : "Password must be between 5-25 characters and can only contain these special characters (!, @, #, $, %)."
            }
            InputProps={{
              readOnly: !editPassword,
              disableUnderline: !editPassword,
              type: viewPassword ? "default" : "password",
            }}
          />
        </Grid>
        <Grid container item xs={4} justify='flex-end'>
          <Tooltip
            arrow
            title={viewPassword ? "Hide Password" : "View Password"}
            placement='left'
          >
            <IconButton onClick={() => setViewPassword(!viewPassword)}>
              {viewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
          {editPassword && (
            <IconButton onClick={cancelPassword}>
              <CloseRoundedIcon />
            </IconButton>
          )}
          <IconButton onClick={handleEditPassword}>
            {editPassword ? <DoneRoundedIcon /> : <EditRoundedIcon />}
          </IconButton>
        </Grid>

        {editPassword && (
          <Grid className='bottomMargin' item xs={8}>
            <TextField
              fullWidth
              value={password2}
              error={!passwordsMatch}
              placeholder='Confirm password'
              onChange={(e) => setPassword2(e.target.value)}
              helperText={passwordsMatch ? "" : "Passwords don't match."}
              InputProps={{
                readOnly: !editPassword,
                disableUnderline: !editPassword,
                type: viewPassword ? "default" : "password",
              }}
            />
          </Grid>
        )}
      </>
    );
  }

  function handleEditPassword() {
    if (!editPassword) {
      setEditPassword(true);
    } else {
      confirmPassword();
    }
  }

  function confirmPassword() {
    if (!password) {
      cancelPassword();
      return;
    }

    setValidPassword(validatePassword(password));
    if (!validatePassword(password)) return;

    setPasswordsMatch(password === password2);
    if (password !== password2) return;

    sheetDispatch({ type: "updateSheetPassword", password: password });
    cancelPassword();
  }

  function cancelPassword() {
    setEditPassword(false);
    setPasswordsMatch(true);
    setValidPassword(true);
    setPassword("");
    setPassword2("");
  }

  // ----------------- DELETE SHEET -----------------

  function renderDeleteSheetSetting(): JSX.Element {
    return (
      <>
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
      </>
    );
  }

  function handleDeleteSheet() {
    if (!editDelete) {
      setEditDelete(true);
    } else {
      confirmDeleteSheet();
    }
  }

  async function confirmDeleteSheet() {
    if (!deleteText.trim()) {
      cancelDeleteSheet();
      return;
    }

    if (deleteText !== sheetState.title) {
      setDeleteError(true);
      return;
    }

    sheetDispatch({ type: "deleteSheet" });
    history.push("/");
    cancelDeleteSheet();
  }

  function cancelDeleteSheet() {
    setDeleteError(false);
    setEditDelete(false);
    setDeleteText("");
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='sm'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Settings' onClose={handleClose} />
      <DialogContent className='modalContent'>
        <Grid container spacing={0} alignItems='center'>
          {renderSheetTitleSetting()}
          {!sheetState.local && renderCustomLinkSetting()}
          {renderToggleSettings()}
          {!sheetState.local && renderSheetPasswordSetting()}
          {!sheetState.local && renderDeleteSheetSetting()}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
