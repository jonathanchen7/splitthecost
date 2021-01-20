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
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Remove User' onClose={handleClose} />
      <DialogContent>
        Are you sure you want to remove <b>{removeUser.displayName}</b> and all
        associated items?
      </DialogContent>
      <DialogActions className='modalActions'>
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
