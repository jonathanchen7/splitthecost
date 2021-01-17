import * as React from "react";
import {
  Button,
  Checkbox,
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
import { useContext, useState } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NumberFormat from "react-number-format";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";
import { UserChip } from "../users/UserChip";

export const AddEntryModal: React.FC = () => {
  const { sheetData, sheetDispatch } = useContext(SheetContext);
  const { appUserData } = useContext(UserContext);

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
    sheetDispatch({
      type: "addEntry",
      createdBy: appUserData.curUser!.id,
      item: item,
      cost: cost,
      exclude: excludedUsers,
      note: note,
    });
    handleClose();
  }

  return (
    <>
      <Dialog fullWidth maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle className='modalTitle'>Add Entry</DialogTitle>
        <DialogContent className='modalContent' dividers>
          <div className='modalInputRow'>
            <TextField
              className='itemInput'
              fullWidth
              label='Item'
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
                    <UserChip hideTooltip user={sheetData.users[userId]} />
                  ))}
                </>
              )}
            >
              {Object.keys(sheetData.users).map((userId) => (
                <MenuItem
                  // @ts-ignore
                  value={userId}
                  key={userId}
                >
                  <Checkbox
                    color='primary'
                    checked={excludedUsers.includes(userId)}
                  />
                  <UserChip hideTooltip user={sheetData.users[userId]} />
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
          <AddRoundedIcon />
          <span className='leftMarginSmall'>Add Item</span>
        </Fab>
      </div>
    </>
  );
};
