import * as React from "react";
import { Button, Dialog, DialogContent, Input } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { db } from "../../firebase";

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
    setOpen(false);
  }

  function handleTitleButtonClick() {
    if (editTitle) {
      sheetDispatch({ type: "changeSheetTitle", title: sheetTitle });
      setEditTitle(false);
    } else {
      setEditTitle(true);
    }
  }

  function validateSheetLink(link: string): boolean {
    if (link.trim().length < 5 || link.length > 15) {
      return false;
    }
    return true;
  }

  async function handleLinkButtonClick() {
    if (editLink && sheetLink && validateSheetLink(sheetLink)) {
      const linkSnapshot = await db
        .collection("customLinks")
        .doc(sheetLink)
        .get();
      if (linkSnapshot.exists) {
        setValidLink(false);
        return;
      }

      sheetDispatch({ type: "changeSheetLink", link: sheetLink });
      setEditLink(false);
    } else {
      setEditLink(true);
    }
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
          <Button onClick={handleTitleButtonClick}>
            {editTitle ? "CONFIRM" : "EDIT"}
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
          <Button onClick={handleLinkButtonClick}>
            {editLink ? "CONFIRM" : "EDIT"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
