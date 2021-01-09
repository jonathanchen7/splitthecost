import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { User } from "../../models/models";
import { useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { addUser } from "../../actions/actions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ setUsers, open, setOpen }) => {
  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSettings() {
    setOpen(false);
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle className='dialogTitle'>Settings</DialogTitle>
      <DialogContent>asdf</DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={confirmSaveSettings}>
          <DoneIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
