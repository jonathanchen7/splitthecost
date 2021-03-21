import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
// import NumberFormat from "react-number-format";
import { SheetContext } from "../pages/SplitTheCost";
import { useHistory } from "react-router-dom";
import { ModalHeader } from "./ModalHeader";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveSheetModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const history = useHistory();

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setButtonText(sheetState.local ? "SAVE" : "SAVED");
  }, [sheetState.local]);

  function handleClose() {
    setOpen(false);
  }

  async function confirmSaveSheet() {
    if (sheetState.local) {
      setButtonText("SAVING");
      await new Promise((r) => setTimeout(r, 500));
      sheetDispatch({ type: "saveSheet" });
      history.push(`/sheet/${sheetState.id}`);
    }
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Save Sheet' onClose={handleClose} />
      <DialogContent className='modalContent bottomMargin'>
        <Grid container spacing={0} alignItems='center'>
          Would you like to save this sheet to the cloud for future access?
        </Grid>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          disabled={!sheetState.local}
          onClick={confirmSaveSheet}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
