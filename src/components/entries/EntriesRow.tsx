import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useEffect } from "react";
import { IconButton, Input, InputAdornment } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry, User } from "../../models/models";
import NumberFormat from "react-number-format";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  entry: Entry;
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  curUser: User;
}

export const EntriesRow: React.FC<Props> = ({
  entry,
  entries,
  setEntries,
  curUser,
}) => {
  const [item, setItem] = useState(entry.item);
  const [cost, setCost] = useState(entry.cost);
  const [note, setNote] = useState(entry.note);
  const [showDelete, setShowDelete] = useState(false);

  function deleteEntry() {
    setEntries(entries.filter((cur) => entry !== cur));
  }

  useEffect(() => {
    if (entry.item && entry.cost && entry.note !== undefined) {
      setItem(entry.item);
      setCost(entry.cost);
      setNote(entry.note);
    }
  }, [entry.item, entry.cost, entry.note]);

  function updateCost(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setCost(Number(e.target.value));
    entry.cost = Number(e.target.value);
  }

  function handleMouseOver() {
    if (entry.createdBy === curUser) {
      setShowDelete(true);
    }
  }

  function handleMouseLeave() {
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
            value={item}
            onChange={(e) => setItem(e.target.value)}
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
            value={cost}
            onChange={updateCost}
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
        <div className='lastEntryDiv'>
          <Input
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Grid>
    </Grid>
  );
};
