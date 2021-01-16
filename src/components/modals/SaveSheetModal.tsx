import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import { useContext, useState } from "react";
// import NumberFormat from "react-number-format";
import { SheetContext } from "../SplitTheCost";
import { useHistory } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveSheetModal: React.FC<Props> = ({ open, setOpen }) => {
  const history = useHistory();

  const { sheetData, sheetDispatch } = useContext(SheetContext);

  const [copyButtonText, setCopyButtonText] = useState("COPY");

  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSheet() {
    sheetDispatch({ type: "saveSheet" });
    history.push(`/sheet/${sheetData.id}`);
  }

  function copySheetLink() {
    navigator.clipboard.writeText(`localhost:3000/sheet/${sheetData.id}`);
    setCopyButtonText("COPIED");
  }

  return (
    <>
      <Dialog fullWidth maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle className='modalTitle'>Save Sheet</DialogTitle>
        <DialogContent dividers>
          {sheetData.local ? (
            "Would you like to save this sheet for future access?"
          ) : (
            <div>
              Share the link to this sheet:
              <Paper className='saveLinkPaper' elevation={3}>
                splitthecost.com/sheet/{sheetData.id}
                <Button color='primary' onClick={copySheetLink}>
                  {copyButtonText}
                </Button>
              </Paper>
            </div>
          )}
        </DialogContent>
        <DialogActions className='modalActions'>
          <Button className='modalCancelButton' onClick={handleClose}>
            Close
          </Button>
          {sheetData.local && (
            <Button
              className='modalConfirmButton rightMarginSmall'
              onClick={confirmSaveSheet}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
