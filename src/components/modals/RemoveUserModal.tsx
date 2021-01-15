import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useContext } from "react";
import { SheetContext } from "../SplitTheCost";
import { User } from "../../models/models";

interface Props {
  removeUser: User;
  setRemoveUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveUserModal: React.FC<Props> = ({
  removeUser,
  setRemoveUser,
  open,
  setOpen,
}) => {
  const { sheetDispatch } = useContext(SheetContext);

  function handleClose() {
    setRemoveUser(undefined);
    setOpen(false);
  }

  function confirmDeleteUser() {
    sheetDispatch({
      type: "removeUser",
      userId: removeUser.id,
    });

    setOpen(false);
  }

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle className='modalTitle'>Remove User</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to remove <b>{removeUser.displayName}</b>?
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button className='modalCancelButton' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmDeleteUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
