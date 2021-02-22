import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { Entry } from "../../models/models";
import { ModalHeader } from "./ModalHeader";
import { handleKeyPress } from "../../logic/logic";

interface Props {
  entry: Entry;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveEntryModal: React.FC<Props> = ({ entry, open, setOpen }) => {
  const { sheetDispatch } = useContext(SheetContext);

  function handleClose() {
    setOpen(false);
  }

  function confirmRemoveEntry() {
    sheetDispatch({
      type: "removeEntry",
      entryId: entry.id,
    });

    setOpen(false);
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", confirmRemoveEntry)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Remove Entry' onClose={handleClose} />
      <DialogContent>
        Are you sure you want to remove <b>{entry.item}</b> from this sheet?
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmRemoveEntry}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
