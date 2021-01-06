import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Input,
  InputAdornment,
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  curUser: User;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const AddEntryModal: React.FC<Props> = ({ curUser, setEntries }) => {
  const [open, setOpen] = useState(true);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState<number>();
  const [note, setNote] = useState("");
  const [excludedUsers, setExcludedUsers] = useState<User[]>([]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function confirmAddEntry() {
    addEntry(curUser, setEntries, item, cost, excludedUsers, note);
    handleClose();
  }

  return (
    <div>
      <div className='addItemFabDiv'></div>
      <Dialog
        fullWidth={true}
        maxWidth='xs'
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
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>
          <TextField className='modalInputRow' fullWidth label='Exclude' />
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
