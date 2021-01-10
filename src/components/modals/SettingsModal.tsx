import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ open, setOpen }) => {
  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSettings() {
    handleClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle className='modalTitle'>Settings</DialogTitle>
      <DialogContent className='modalContent' dividers>
        <div className='settingsDiv'>
          <span>No settings to change!</span>
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button className='modalCancelButton' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmSaveSettings}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
