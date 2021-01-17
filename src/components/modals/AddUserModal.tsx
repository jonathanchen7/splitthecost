import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { SheetContext } from "../SplitTheCost";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddUserModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sheetDispatch } = useContext(SheetContext);

  const [firstNameVal, setFirstNameVal] = useState("");
  const [validFirstName, setValidFirstName] = useState(true);
  const [lastNameVal, setLastNameVal] = useState("");
  const [validLastName, setValidLastName] = useState(true);

  // Resets dialog inputs.
  function resetDialog() {
    setFirstNameVal("");
    setLastNameVal("");
    setValidFirstName(true);
    setValidLastName(true);
  }

  function handleClose() {
    resetDialog();
    setOpen(false);
  }

  function validateName(name: string): boolean {
    return name.length > 0 && /^[a-zA-Z]+$/.test(name);
  }

  function confirmAddUser() {
    // Validate first and last name.
    const temp1 = validateName(firstNameVal);
    const temp2 = validateName(lastNameVal);

    setValidFirstName(temp1);
    setValidLastName(temp2);

    if (!temp1 || !temp2) return;

    sheetDispatch({
      type: "addUser",
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: "",
    });

    resetDialog();
    setOpen(false);
  }

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle className='modalTitle'>Add User</DialogTitle>
      <DialogContent className='modalContent' dividers>
        <div className='modalInputRow'>
          <TextField
            className='halfWidthModalInput'
            label='First Name'
            value={firstNameVal}
            onChange={(e) => setFirstNameVal(e.target.value)}
            error={!validFirstName}
            helperText={!validFirstName && "Please enter a valid name."}
          />
          <TextField
            className='halfWidthModalInput'
            label='Last Name'
            value={lastNameVal}
            onChange={(e) => setLastNameVal(e.target.value)}
            error={!validLastName}
            helperText={!validLastName && "Please enter a valid name."}
          />
        </div>
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
