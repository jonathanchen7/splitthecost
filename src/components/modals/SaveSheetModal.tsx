import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
} from "@material-ui/core";
import { useContext, useState } from "react";
// import NumberFormat from "react-number-format";
import { SheetContext } from "../pages/SplitTheCost";
import { useHistory } from "react-router-dom";
import { ModalHeader } from "./ModalHeader";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveSheetModal: React.FC<Props> = ({ open, setOpen }) => {
  const history = useHistory();

  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [copyButtonText, setCopyButtonText] = useState("COPY");

  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSheet() {
    sheetDispatch({ type: "saveSheet" });
    history.push(`/sheet/${sheetState.id}`);
  }

  function copySheetLink() {
    navigator.clipboard.writeText(`localhost:3000/sheet/${sheetState.id}`);
    setCopyButtonText("COPIED");
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Share Sheet' onClose={handleClose} />
      <DialogContent className='modalContent'>
        {sheetState.local ? (
          "Would you like to generate a shareable link for this sheet?"
        ) : (
          <Paper className='saveLinkPaper' elevation={3}>
            splitthecost.com/sheet/{sheetState.id}
            <Button color='primary' onClick={copySheetLink}>
              {copyButtonText}
            </Button>
          </Paper>
        )}
      </DialogContent>
      {sheetState.local && (
        <DialogActions className='modalActions'>
          <Button
            className='modalConfirmButton rightMarginSmall'
            onClick={confirmSaveSheet}
          >
            GENERATE
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
