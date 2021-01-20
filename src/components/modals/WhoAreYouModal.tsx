import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { SheetContext } from "../pages/SplitTheCost";
import { useContext, useState } from "react";
import { UserChip } from "../bits/UserChip";
import { UserContext } from "../../App";
import { User } from "../../models/models";
import { ModalHeader } from "./ModalHeader";

interface Props {
  open: boolean;
}

export const WhoAreYouModal: React.FC<Props> = ({ open }) => {
  const { sheetState } = useContext(SheetContext);
  const { userDispatch } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState<User>();

  function confirmUser() {
    userDispatch({
      type: "updateCurUser",
      user: selectedUser!,
    });
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Who are You?' />
      <DialogContent>
        {Object.entries(sheetState.users).map((pair) => {
          const user = pair[1];
          return (
            <UserChip
              className={`bottomMargin rightMargin ${
                selectedUser?.id === user.id && "selectedChip"
              }`}
              user={user}
              onClick={setSelectedUser}
              key={user.id}
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
