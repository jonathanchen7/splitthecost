import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
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

export const AddUserModal: React.FC<Props> = ({ setUsers, open, setOpen }) => {
  const [firstNameVal, setFirstNameVal] = useState("");
  const [validFirstName, setValidFirstName] = useState(true);

  const [lastNameVal, setLastNameVal] = useState("");
  const [validLastName, setValidLastName] = useState(true);

  const [emailVal, setEmailVal] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  // Resets dialog inputs.
  function resetDialog() {
    setFirstNameVal("");
    setLastNameVal("");
    setEmailVal("");
    setValidFirstName(true);
    setValidLastName(true);
    setValidEmail(true);
  }

  function handleClose() {
    resetDialog();
    setOpen(false);
  }

  function validateName(name: string): boolean {
    return name.length > 0 && /^[a-zA-Z]+$/.test(name);
  }

  function validateEmail(email: string): boolean {
    return (
      email.length > 0 &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    );
  }

  function confirmAddUser() {
    // Validate first name, last name, and email.
    const temp1 = validateName(firstNameVal);
    const temp2 = validateName(lastNameVal);
    const temp3 = validateEmail(emailVal);

    setValidFirstName(temp1);
    setValidLastName(temp2);
    setValidEmail(temp3);

    if (!temp1 || !temp2 || !temp3) return;

    addUser(firstNameVal, lastNameVal, emailVal, setUsers);

    resetDialog();
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
      <DialogTitle className='modalTitle'>Add User</DialogTitle>
      <DialogContent className='modalContent' dividers>
        <div className='modalInputRow'>
          <TextField
            className='halfWidthModalInput'
            label='First Name'
            type='search'
            value={firstNameVal}
            onChange={(e) => setFirstNameVal(e.target.value)}
            error={!validFirstName}
            helperText={!validFirstName && "Please enter a valid name."}
          />
          <TextField
            className='halfWidthModalInput'
            label='Last Name'
            type='search'
            value={lastNameVal}
            onChange={(e) => setLastNameVal(e.target.value)}
            error={!validLastName}
            helperText={!validLastName && "Please enter a valid name."}
          />
        </div>
        <TextField
          fullWidth
          label='Email'
          type='search'
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          error={!validEmail}
          helperText={!validEmail && "Please enter a valid email."}
        />
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button className='modalCancelButton' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmAddUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
