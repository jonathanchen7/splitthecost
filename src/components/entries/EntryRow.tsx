import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useEffect } from "react";
import { Avatar, IconButton, Input, InputAdornment } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry, User } from "../../models/models";
import { getAvatarColor } from "../users/UserAvatar";

interface Props {
  entry: Entry;
  entries: Entry[];
  curUser: User;
}

function validateCost(input: string): boolean {
  return input.charAt(input.length - 1) !== "." || !isNaN(Number(input));
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
    if (validateCost(e.target.value)) {
      setCost(e.target.value);
    }
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
    <Grid container spacing={0}>
      <Grid
        className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
        item
        xs={3}
      >
        <div
          className='entryDiv'
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            className='avatar'
            style={{ backgroundColor: getAvatarColor(entry.createdBy) }}
          >
            {entry.createdBy.firstName.charAt(0).toLocaleUpperCase()}
            {entry.createdBy.lastName.charAt(0).toLocaleUpperCase()}
          </Avatar>
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
      <Grid
        className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
        item
        xs={1}
      >
        <div className='entryDiv'>
          <Input
            className='entryInput'
            disableUnderline={true}
            fullWidth={true}
            value={cost}
            onChange={updateCost}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </div>
      </Grid>
      <Grid
        className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
        item
        xs={2}
      >
        <div className='entryDiv'>
          {entry.exclude?.map((user) => (
            <Avatar
              className='excludeAvatar'
              style={{ backgroundColor: getAvatarColor(user) }}
            >
              {user.firstName.charAt(0).toLocaleUpperCase()}
              {user.lastName.charAt(0).toLocaleUpperCase()}
            </Avatar>
          ))}
          <Avatar className='excludeAvatar'>
            <AddIcon />
          </Avatar>
        </div>
      </Grid>
      <Grid
        className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
        item
        xs={6}
      >
        <div className='entryDiv'>
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
