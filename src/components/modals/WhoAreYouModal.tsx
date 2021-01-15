import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

interface Props {
  open: boolean;
}

export const WhoAreYouModal: React.FC<Props> = ({ open }) => {
  function confirmUser() {}

  return (
    <Dialog fullWidth maxWidth='xs' open={open}>
      <DialogTitle className='modalTitle'>Who Are You?</DialogTitle>
      <DialogContent className='modalContent' dividers>
        <div className='settingsDiv'>
          <span>Select one of these people.</span>
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
