import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { handleKeyPress, validateName } from "../../logic/logic";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddUserModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(true);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(true);
  const [uniqueUser, setUniqueUser] = useState(true);

  // Resets dialog inputs.
  function resetDialog() {
    setFirstName("");
    setLastName("");
    setValidFirstName(true);
    setValidLastName(true);
    setUniqueUser(true);
  }

  function handleClose() {
    resetDialog();
    setOpen(false);
  }

  function validateNewUser(firstName: string, lastName: string): boolean {
    const first = firstName.trim().toLocaleLowerCase();
    const last = lastName.trim().toLocaleLowerCase();

    const checkFirstName = validateName(first);
    const checkLastName = validateName(last);
    setValidFirstName(checkFirstName);
    setValidLastName(checkLastName);

    if (!checkFirstName || !checkLastName) return false;

    let unique = true;
    Object.entries(sheetState.users).forEach((pair) => {
      const user = pair[1];
      if (
        user.firstName.toLocaleLowerCase() === first &&
        user.lastName.toLocaleLowerCase() === last
      ) {
        unique = false;
      }
    });

    setUniqueUser(unique);
    return unique;
  }

  function confirmAddUser() {
    // Validate first/last name and check for duplicates.
    if (sheetState.numUsers > 10 || !validateNewUser(firstName, lastName)) {
      return;
    }

    sheetDispatch({
      type: "addUser",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: "",
    });

    resetDialog();
    setOpen(false);
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", confirmAddUser)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Add a Friend' onClose={handleClose} />
      <DialogContent>
        <div className='modalInputRow'>
          <TextField
            className='halfWidthModalInput'
            autoFocus
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!validFirstName || !uniqueUser}
            helperText={
              (!validFirstName && "Please enter a valid name.") ||
              (!uniqueUser && "Duplicate users not allowed.")
            }
          />
          <TextField
            className='halfWidthModalInput'
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!validLastName || !uniqueUser}
            helperText={
              (!validLastName && "Please enter a valid name.") ||
              (!uniqueUser && "Duplicate users not allowed.")
            }
          />
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
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
