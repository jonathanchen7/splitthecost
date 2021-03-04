import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { User } from "../../models/models";
import { ModalHeader } from "./ModalHeader";
import { handleKeyPress } from "../../logic/logic";

interface Props {
  removeUser: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveUserModal: React.FC<Props> = ({
  removeUser,
  open,
  setOpen,
}) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  function handleClose() {
    setOpen(false);
  }

  function confirmRemoveUser() {
    if (removeUser.id !== sheetState.createdBy) {
      sheetDispatch({
        type: "removeUser",
        userId: removeUser.id,
      });
    }

    setOpen(false);
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", confirmRemoveUser)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Remove Friend' onClose={handleClose} />
      <DialogContent>
        Are you sure you want to remove <b>{removeUser.displayName}</b> and all
        associated entries from this sheet?
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmRemoveUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
