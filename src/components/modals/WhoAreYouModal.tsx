import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { SheetContext } from "../SplitTheCost";
import { useContext } from "react";
import { UserChip } from "../users/UserChip";

interface Props {
  open: boolean;
}

export const WhoAreYouModal: React.FC<Props> = ({ open }) => {
  const { sheetData } = useContext(SheetContext);

  function confirmUser() {}

  return (
    <Dialog fullWidth maxWidth='xs' open={open}>
      <DialogTitle className='modalTitle'>Who Are You?</DialogTitle>
      <DialogContent className='modalContent' dividers>
        {Object.entries(sheetData.users).map((pair) => {
          const user = pair[1];
          return <UserChip className='bottomMargin' hideTooltip user={user} />;
        })}
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
