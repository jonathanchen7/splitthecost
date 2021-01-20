import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [sheetTitle, setSheetTitle] = useState(sheetState.title);

  useEffect(() => {
    setSheetTitle(sheetState.title);
  }, [sheetState.title]);

  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSettings() {
    handleClose();
  }

  function changeSheetTitle() {
    sheetDispatch({ type: "changeSheetTitle", title: sheetTitle });
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Settings' onClose={handleClose} />
      <DialogContent className='modalContent'>
        <div className='settingsDiv'>
          <TextField
            label={"Sheet Title"}
            value={sheetTitle}
            onChange={(e) => setSheetTitle(e.target.value)}
          />
          <Button onClick={changeSheetTitle}>Update</Button>
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmSaveSettings}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
