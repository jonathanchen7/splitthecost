import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useEffect } from "react";
import { Avatar, IconButton, Input, InputAdornment } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry, User } from "../../models/models";
import { generateUserAvatar, getAvatarColor } from "../users/UserAvatar";
import NumberFormat from "react-number-format";
import { UserTest } from "../users/UserTest";

interface Props {
  entry: Entry;
  entries: Entry[];
  curUser: User;
}

export const EntryRow: React.FC<Props> = ({ entry, entries, curUser }) => {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const [showDelete, setShowDelete] = useState(false);

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
    setCost(e.target.value);
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
            <UserTest user={entry.createdBy} tooltipPlacement='top' />
          </span>
          <Input
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          {showDelete && (
            <IconButton className='actionIcon'>
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
              thousandSeparator: ",",
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
            <span className='smallLeftMargin'>
              <UserTest user={user} tooltipPlacement='top' />
            </span>
          ))}
          <Avatar className='smallLeftMargin'>
            <AddIcon />
          </Avatar>
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
