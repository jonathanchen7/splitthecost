import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { SheetContext } from "../SplitTheCost";
import { useContext, useState } from "react";
import { UserChip } from "../users/UserChip";
import { UserContext } from "../../App";
import { User } from "../../models/models";

interface Props {
  open: boolean;
}

export const WhoAreYouModal: React.FC<Props> = ({ open }) => {
  const { sheetData } = useContext(SheetContext);
  const { appUserDispatch } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState<User>();

  function confirmUser() {
    appUserDispatch({
      type: "updateCurUser",
      user: selectedUser!,
    });
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={open}>
      <DialogTitle className='modalTitle'>Who Are You?</DialogTitle>
      <DialogContent dividers>
        {Object.entries(sheetData.users).map((pair) => {
          const user = pair[1];
          return (
            <UserChip
              className={`${
                selectedUser?.id === user.id ? "selectedChip " : ""
              } bottomMargin`}
              user={user}
              onClick={setSelectedUser}
            />
          );
        })}
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          disabled={!selectedUser}
          onClick={confirmUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
