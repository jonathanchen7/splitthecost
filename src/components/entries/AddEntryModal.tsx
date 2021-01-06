import * as React from "react";
import {
  Avatar,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Entry, User } from "../../models/models";
import { useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { addEntry } from "../../actions/actions";
import AddIcon from "@material-ui/icons/Add";
import NumberFormat from "react-number-format";
import getAvatarColor from "../users/UserAvatar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  curUser: User;
  users: User[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const AddEntryModal: React.FC<Props> = ({
  curUser,
  users,
  setEntries,
}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");
  const [excludedUsers, setExcludedUsers] = useState<User[]>([]);

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
    setExcludedUsers(event.target.value as User[]);
  }

  function confirmAddEntry() {
    addEntry(curUser, setEntries, item, cost, excludedUsers, note);
    handleClose();
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle className='dialogTitle'>Add Entry</DialogTitle>
        <DialogContent>
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
          <FormControl className='excludeUsersForm' fullWidth>
            <InputLabel id='excludeUsersInput'>Excluded Users</InputLabel>
            <Select
              labelId='excludeUsersInput'
              className='modalInputRow'
              multiple
              value={excludedUsers}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => (
                <div>
                  {(selected as User[]).map((user) => (
                    <Chip
                      className='smallLeftMargin'
                      avatar={
                        <Avatar
                          className='usersBarAvatar'
                          style={{ backgroundColor: getAvatarColor(user) }}
                        >
                          {user.initials}
                        </Avatar>
                      }
                      label={user.displayName}
                      key={user.id}
                    />
                  ))}
                </div>
              )}
            >
              {users.map((user) => (
                <MenuItem
                  className='excludeUsersMenuItem'
                  // @ts-ignore
                  value={user}
                  key={user.id}
                >
                  <Checkbox
                    color='primary'
                    checked={excludedUsers.includes(user)}
                  />
                  <Chip
                    avatar={
                      <Avatar
                        className='usersBarAvatar'
                        style={{ backgroundColor: getAvatarColor(user) }}
                      >
                        {user.initials}
                      </Avatar>
                    }
                    label={user.displayName}
                    key={user.id}
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
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={confirmAddEntry}>
            <DoneIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <div className='addItemFabDiv'>
        <Fab variant='extended' size='medium' onClick={handleOpen}>
          <AddIcon />
          <span className='buttonText'>Add Item</span>
        </Fab>
      </div>
    </div>
  );
};
