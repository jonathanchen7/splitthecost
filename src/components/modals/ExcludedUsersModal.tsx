import * as React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Entry } from "../../models/models";
import { useState, useContext, useEffect } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { UserChip } from "../bits/UserChip";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: Entry;
}

export const ExcludedUsersModal: React.FC<Props> = ({
  open,
  setOpen,
  entry,
}) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [excludedUsers, setExcludedUsers] = useState<string[]>(entry.exclude);

  useEffect(() => {
    setExcludedUsers(entry.exclude);
  }, [entry.exclude]);

  function confirmExcludeUsers() {
    if (entry.exclude !== excludedUsers) {
      sheetDispatch({
        type: "updateExcludedUsers",
        exclude: excludedUsers,
        entry: entry,
      });
    }

    handleClose();
  }

  function handleClick(userId: string) {
    if (excludedUsers.includes(userId)) {
      setExcludedUsers(excludedUsers.filter((id) => id !== userId));
    } else {
      setExcludedUsers([...excludedUsers, userId]);
    }
  }

  function handleClose() {
    setExcludedUsers(entry.exclude);
    setOpen(false);
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Included Friends' onClose={handleClose} />
      <DialogContent className='excludeModalContent'>
        <div className='excludeModalColumn'>
          {Object.entries(sheetState.users).map((pair, idx) => {
            const user = pair[1];
            return (
              idx % 2 === 0 && (
                <div className='excludeModalUser'>
                  <Checkbox
                    checked={!excludedUsers.includes(user.id)}
                    color='primary'
                    onClick={() => handleClick(user.id)}
                  />
                  <UserChip user={user} onClick={() => handleClick(user.id)} />
                </div>
              )
            );
          })}
        </div>
        <div className='excludeModalColumn'>
          {Object.entries(sheetState.users).map((pair, idx) => {
            const user = pair[1];
            return (
              idx % 2 === 1 && (
                <div className='excludeModalUser'>
                  <Checkbox
                    checked={!excludedUsers.includes(user.id)}
                    color='primary'
                    onClick={() => handleClick(user.id)}
                  />
                  <UserChip user={user} onClick={() => handleClick(user.id)} />
                </div>
              )
            );
          })}
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='rightMarginSmall'
          color='primary'
          onClick={() => setExcludedUsers([])}
        >
          Include All
        </Button>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmExcludeUsers}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
