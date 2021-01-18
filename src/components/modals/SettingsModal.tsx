import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../SplitTheCost";

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
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle className='modalTitle'>Settings</DialogTitle>
      <DialogContent className='modalContent' dividers>
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
        <Button className='modalCancelButton' onClick={handleClose}>
          Cancel
        </Button>
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
