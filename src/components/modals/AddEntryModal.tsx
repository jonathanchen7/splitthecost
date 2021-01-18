import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useContext, useState } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NumberFormat from "react-number-format";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";

export const AddEntryModal: React.FC = () => {
  const { sheetDispatch } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");

  function addEntry() {
    sheetDispatch({
      type: "addEntry",
      createdBy: userState.curUser!.id,
      item: "",
      cost: 0,
      exclude: [],
      note: "",
    });
  }

  // function handleOpen() {
  //   setOpen(true);
  // }

  function handleClose() {
    setItem("");
    setCost(0);
    setNote("");
    setOpen(false);
  }

  function confirmAddEntry() {
    sheetDispatch({
      type: "addEntry",
      createdBy: userState.curUser!.id,
      item: item,
      cost: cost,
      exclude: [],
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
        <Fab
          className='addItemFab'
          variant='extended'
          size='medium'
          onClick={addEntry}
        >
          <AddRoundedIcon />
          <span className='leftMarginSmall'>Add Item</span>
        </Fab>
      </div>
    </>
  );
};
