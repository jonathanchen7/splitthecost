import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { IconButton, Input, InputAdornment } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry, User } from "../../models/models";
import NumberFormat from "react-number-format";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  entry: Entry;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  curUser: User;
}

export const EntriesRow: React.FC<Props> = ({
  entry,
  entries,
  setEntries,
  curUser,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [itemVal, setItemVal] = useState(entry.item);
  const [noteVal, setNoteVal] = useState(entry.note);

  function deleteEntry() {
    setEntries(entries.filter((cur) => entry !== cur));
  }

  function updateItemState(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const entriesCopy: Entry[] = [...entries];
    const updatedEntry: Entry = { ...entry, item: e.target.value };
    entriesCopy[entries.indexOf(entry)] = updatedEntry;

    setEntries(entriesCopy);
  }

  function updateCostState(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const entriesCopy: Entry[] = [...entries];
    const updatedEntry: Entry = { ...entry, cost: Number(e.target.value) };
    entriesCopy[entries.indexOf(entry)] = updatedEntry;
    setEntries(entriesCopy);
  }

  function updateNoteState(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const entriesCopy: Entry[] = [...entries];
    const updatedEntry: Entry = { ...entry, note: e.target.value };
    entriesCopy[entries.indexOf(entry)] = updatedEntry;

    setEntries(entriesCopy);
  }

  function handleMouseOver(): void {
    if (entry.createdBy === curUser) {
      setShowDelete(true);
    }
  }

  function handleMouseLeave(): void {
    if (entry.createdBy === curUser) {
      setShowDelete(false);
    }
  }

  return (
    <Grid
      className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
      container
      spacing={0}
    >
      <Grid item xs={3}>
        <div
          className='entryDiv'
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <span className='leftMargin'>
            <UserAvatar user={entry.createdBy} tooltipPlacement='top' />
          </span>
          <Input
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={itemVal}
            onChange={(e) => setItemVal(e.target.value)}
            onBlur={updateItemState}
          />
          {showDelete && (
            <IconButton
              className='largeIconButton smallRightMargin'
              onClick={deleteEntry}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </Grid>
      <Grid item xs={1}>
        <div className='entryDiv'>
          <Input
            inputComponent={NumberFormat as any}
            inputProps={{
              decimalScale: 2,
              allowNegative: false,
            }}
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={entry.cost.toFixed(2)}
            onChange={updateCostState}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className='entryDiv'>
          {entry.exclude?.map((user) => (
            <span className='smallLeftMargin' key={user.id}>
              <UserAvatar user={user} tooltipPlacement='top' />
            </span>
          ))}
          <IconButton className='largeIconButton smallLeftMargin'>
            <AddIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className='entryDiv'>
          <Input
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={noteVal}
            onChange={(e) => setNoteVal(e.target.value)}
            onBlur={updateNoteState}
          />
        </div>
      </Grid>
    </Grid>
  );
};
