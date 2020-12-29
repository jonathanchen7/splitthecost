import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { User } from "../../models/models";
import { useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const AddUserAvatar: React.FC<Props> = ({ users, setUsers }) => {
  const [open, setOpen] = useState(false);
  const [firstNameVal, setFirstNameVal] = useState("");
  const [lastNameVal, setLastNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function addUser() {
    if (firstNameVal && lastNameVal && emailVal) {
      const tempUser: User = {
        firstName: firstNameVal,
        lastName: lastNameVal,
        email: emailVal,
      };
      setUsers([...users, tempUser]);
      setFirstNameVal("");
      setLastNameVal("");
      setEmailVal("");
      setOpen(false);
    }
  }

  return (
    <div>
      <Tooltip arrow title='Add User' placement='right'>
        <IconButton className='actionIcon' onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth='xs'
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle>Add User </DialogTitle>
        <DialogContent dividers>
          <div className='dialogNames'>
            <TextField
              className='dialogNameInput'
              label='First Name'
              type='search'
              value={firstNameVal}
              onChange={(e) => setFirstNameVal(e.target.value)}
            />
            <TextField
              className='dialogNameInput'
              label='Last Name'
              type='search'
              value={lastNameVal}
              onChange={(e) => setLastNameVal(e.target.value)}
            />
          </div>
          <TextField
            fullWidth
            label='Email'
            type='search'
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <IconButton className='actionIcon' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton className='actionIcon' onClick={addUser}>
            <DoneIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
