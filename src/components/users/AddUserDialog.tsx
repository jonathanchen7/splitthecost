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
import { v4 as uuidv4 } from "uuid";

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

export const AddUserDialog: React.FC<Props> = ({ setUsers, open, setOpen }) => {
  const [firstNameVal, setFirstNameVal] = useState("");
  const [validFirstName, setValidFirstName] = useState(true);
  const [firstNameErrorText, setFirstNameErrorText] = useState("");

  const [lastNameVal, setLastNameVal] = useState("");
  const [validLastName, setValidLastName] = useState(true);
  const [lastNameErrorText, setLastNameErrorText] = useState("");

  const [emailVal, setEmailVal] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState("");

  // Resets dialog inputs.
  function resetDialog() {
    setFirstNameVal("");
    setLastNameVal("");
    setEmailVal("");
    setValidFirstName(true);
    setValidLastName(true);
    setValidEmail(true);
    setFirstNameErrorText("");
    setLastNameErrorText("");
    setEmailErrorText("");
  }

  function handleClose() {
    resetDialog();
    setOpen(false);
  }

  function validateName(name: string): boolean {
    return name.length > 0 && !/\d/.test(name);
  }

  function validateEmail(email: string): boolean {
    return (
      email.length > 0 &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    );
  }

  function addUser() {
    // Validate first name, last name, and email.
    const temp1 = validateName(firstNameVal);
    const temp2 = validateName(lastNameVal);
    const temp3 = validateEmail(emailVal);

    setValidFirstName(temp1);
    setValidLastName(temp2);
    setValidEmail(temp3);

    setFirstNameErrorText(temp1 ? "" : "Please enter a valid name.");
    setLastNameErrorText(temp2 ? "" : "Please enter a valid name.");
    setEmailErrorText(temp3 ? "" : "Please enter a valid email.");

    if (!temp1 || !temp2 || !temp3) return;

    // Input is valid! Add new user.
    const tempUser: User = {
      id: uuidv4(),
      firstName: firstNameVal,
      lastName: lastNameVal,
      initials: `${firstNameVal
        .charAt(0)
        .toLocaleUpperCase()}${lastNameVal.charAt(0).toLocaleUpperCase()}`,
      email: emailVal,
      entries: [],
    };
    setUsers((users) => [...users, tempUser]);

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
      <DialogTitle className='dialogTitle'>Add User </DialogTitle>
      <DialogContent>
        <div className='dialogNames'>
          <TextField
            className='halfWidthInput'
            label='First Name'
            type='search'
            value={firstNameVal}
            onChange={(e) => setFirstNameVal(e.target.value)}
            error={!validFirstName}
            helperText={firstNameErrorText}
          />
          <TextField
            className='halfWidthInput'
            label='Last Name'
            type='search'
            value={lastNameVal}
            onChange={(e) => setLastNameVal(e.target.value)}
            error={!validLastName}
            helperText={lastNameErrorText}
          />
        </div>
        <TextField
          fullWidth
          label='Email'
          type='search'
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          error={!validEmail}
          helperText={emailErrorText}
        />
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={addUser}>
          <DoneIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
