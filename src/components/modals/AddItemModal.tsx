import * as React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Entry, User } from "../../models/models";
import { useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { addEntry } from "../../actions/actions";
import AddIcon from "@material-ui/icons/Add";
import NumberFormat from "react-number-format";
import { getAvatarColor } from "../../actions/actions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  curUser: User;
  users: { [id: string]: User };
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const AddItemModal: React.FC<Props> = ({
  curUser,
  users,
  setEntries,
}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");
  const [excludedUsers, setExcludedUsers] = useState<string[]>([]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setItem("");
    setCost(0);
    setNote("");
    setExcludedUsers([]);
    setOpen(false);
  }

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setExcludedUsers(event.target.value as string[]);
  }

  function confirmAddEntry() {
    addEntry(curUser, setEntries, item, cost, excludedUsers, note);
    handleClose();
  }

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle className='modalTitle'>Add Entry</DialogTitle>
        <DialogContent className='modalContent' dividers>
          <div className='modalInputRow'>
            <TextField
              className='itemInput'
              fullWidth
              label='Item'
              type='search'
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <TextField
              className='costInput'
              InputProps={{
                inputComponent: NumberFormat as any,
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              inputProps={{
                decimalScale: 2,
                allowNegative: false,
              }}
              label='Cost'
              value={cost?.toFixed(2)}
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id='excludeUsersInput'>Excluded Users</InputLabel>
            <Select
              className='modalInputRow'
              labelId='excludeUsersInput'
              multiple
              value={excludedUsers}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => (
                <>
                  {(selected as string[]).map((userId) => (
                    <Chip
                      className='leftMarginSmall'
                      avatar={
                        <Avatar
                          className='usersBarAvatar'
                          style={{
                            backgroundColor: getAvatarColor(users[userId]),
                          }}
                        >
                          {users[userId].initials}
                        </Avatar>
                      }
                      label={users[userId].displayName}
                      key={userId}
                    />
                  ))}
                </>
              )}
            >
              {Object.keys(users).map((userId) => (
                <MenuItem
                  // @ts-ignore
                  value={userId}
                  key={userId}
                >
                  <Checkbox
                    color='primary'
                    checked={excludedUsers.includes(userId)}
                  />
                  <Chip
                    avatar={
                      <Avatar
                        className='usersBarAvatar'
                        style={{
                          backgroundColor: getAvatarColor(users[userId]),
                        }}
                      >
                        {users[userId].initials}
                      </Avatar>
                    }
                    label={users[userId].displayName}
                    key={userId}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className='modalInputRow'
            fullWidth
            multiline
            rowsMax={2}
            label='Note'
            type='search'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='modalActions'>
          <Button className='modalCancelButton' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className='modalConfirmButton rightMarginSmall'
            onClick={confirmAddEntry}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div className='addItemFabDiv'>
        <Fab variant='extended' size='medium' onClick={handleOpen}>
          <AddIcon />
          <span className='leftMarginSmall'>Add Item</span>
        </Fab>
      </div>
    </>
  );
};
