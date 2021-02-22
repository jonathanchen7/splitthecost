import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Radio,
} from "@material-ui/core";
import { Entry } from "../../models/models";
import { useState, useContext, useEffect } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { ModalHeader } from "./ModalHeader";
import { UserChip } from "../bits/UserChip";
import { handleKeyPress } from "../../logic/logic";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: Entry;
}

export const EntryUserModal: React.FC<Props> = ({ open, setOpen, entry }) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [entryUser, setEntryUser] = useState(entry.user);

  useEffect(() => {
    setEntryUser(entry.user);
  }, [entry.user]);

  function confirmEntryUser() {
    if (entryUser !== entry.user) {
      sheetDispatch({
        type: "updateEntry",
        entry: entry,
        section: "user",
        value: entryUser,
      });
    }

    handleClose();
  }

  function handleClick(userId: string) {
    setEntryUser(userId);
  }

  function handleClose() {
    setEntryUser(entry.user);
    setOpen(false);
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", confirmEntryUser)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader
        title='Who Paid?'
        subtitle={entry.item}
        onClose={handleClose}
      />
      <DialogContent className='excludeModalContent'>
        <div className='excludeModalColumn'>
          {Object.entries(sheetState.users).map((pair, idx) => {
            const user = pair[1];
            return (
              idx % 2 === 0 && (
                <div className='excludeModalUser' key={user.id}>
                  <Radio
                    checked={entryUser === user.id}
                    onChange={(e) => handleClick(e.target.value)}
                  />
                  <UserChip
                    user={user}
                    userIdx={Object.keys(sheetState.users).indexOf(user.id)}
                    onClick={() => handleClick(user.id)}
                  />
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
                <div className='excludeModalUser' key={user.id}>
                  <Radio
                    checked={entryUser === user.id}
                    onClick={() => handleClick(user.id)}
                  />
                  <UserChip
                    user={user}
                    userIdx={Object.keys(sheetState.users).indexOf(user.id)}
                    onClick={() => handleClick(user.id)}
                  />
                </div>
              )
            );
          })}
        </div>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmEntryUser}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
