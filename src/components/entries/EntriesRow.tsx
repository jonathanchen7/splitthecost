import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { Avatar, IconButton, Input, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry, User } from "../../models/models";
import NumberFormat from "react-number-format";
import { UserAvatar } from "../users/UserAvatar";
import { removeExcludedUser, deleteEntry } from "../../actions/actions";
import { ExcludedUsersModal } from "../modals/ExcludedUsersModal";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { motion } from "framer-motion";

interface Props {
  entry: Entry;
  entries: Entry[];
  users: { [id: string]: User };
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  curUser: User;
}

export const EntriesRow: React.FC<Props> = ({
  entry,
  entries,
  users,
  setEntries,
  curUser,
}) => {
  const numExcludeUsersDisplay = entry.createdBy === curUser.id ? 3 : 4;

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [itemVal, setItemVal] = useState(entry.item);
  const [noteVal, setNoteVal] = useState(entry.note);
  const [showExcludeUsersModal, setShowExcludeUsersModal] = useState(false);

  function updateEntryState(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string
  ) {
    let updatedEntry: Entry;

    if (section === "item") {
      updatedEntry = { ...entry, item: e.target.value };
    } else if (section === "cost") {
      updatedEntry = { ...entry, cost: Number(e.target.value) };
    } else {
      updatedEntry = { ...entry, note: e.target.value };
    }

    const entriesCopy: Entry[] = [...entries];
    entriesCopy[entries.indexOf(entry)] = updatedEntry;
    setEntries(entriesCopy);
  }

  function mouseOverItem(): void {
    if (entry.createdBy === curUser.id) {
      setShowDelete(true);
    }
  }

  function mouseLeaveItem(): void {
    if (entry.createdBy === curUser.id) {
      setShowDelete(false);
    }
  }

  function mouseOverExclude(): void {
    if (entry.createdBy === curUser.id) {
      setShowEdit(true);
    }
  }

  function mouseLeaveExclude(): void {
    if (entry.createdBy === curUser.id) {
      setShowEdit(false);
    }
  }

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -2000, opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      key={entry.id}
    >
      <Grid
        className={entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
        container
        spacing={0}
      >
        <Grid item xs={3}>
          <div
            className='entryDiv'
            onMouseOver={mouseOverItem}
            onMouseLeave={mouseLeaveItem}
          >
            <UserAvatar
              className='leftMargin'
              user={users[entry.createdBy]}
              tooltipPlacement='top'
            />
            <Input
              className='sideMargins'
              disableUnderline={true}
              fullWidth={true}
              value={itemVal}
              onChange={(e) => setItemVal(e.target.value)}
              onBlur={(e) => {
                updateEntryState(e, "item");
              }}
            />
            {showDelete && (
              <IconButton
                className='iconButton largeIconButton rightMargin'
                onClick={() => deleteEntry(entry, setEntries)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className='entryDiv'>
            <Input
              className='sideMargins'
              inputComponent={NumberFormat as any}
              inputProps={{
                decimalScale: 2,
                allowNegative: false,
              }}
              disableUnderline={true}
              fullWidth={true}
              value={entry.cost.toFixed(2)}
              onChange={(e) => {
                updateEntryState(e, "cost");
              }}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div
            className='entryDiv'
            onMouseOver={mouseOverExclude}
            onMouseLeave={mouseLeaveExclude}
          >
            {entry.exclude.map((userId, idx) => {
              if (idx < numExcludeUsersDisplay) {
                return (
                  <UserAvatar
                    className='leftMarginSmall'
                    user={users[userId]}
                    tooltipPlacement='top'
                    iconOnHover={<DeleteIcon />}
                    onClick={() => {
                      removeExcludedUser(userId, entry, setEntries);
                    }}
                    key={userId}
                  />
                );
              } else if (
                idx === numExcludeUsersDisplay &&
                entry.exclude.length > idx
              ) {
                return (
                  <Avatar className='leftMarginSmall' key={userId}>{`+${
                    entry.exclude.length - numExcludeUsersDisplay
                  }`}</Avatar>
                );
              } else {
                return null;
              }
            })}

            {showEdit && (
              <IconButton
                className='iconButton largeIconButton leftMarginSmall'
                onClick={() => setShowExcludeUsersModal(true)}
              >
                <EditRoundedIcon />
              </IconButton>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='entryDiv'>
            <Input
              className='sideMargins'
              disableUnderline={true}
              fullWidth={true}
              value={noteVal}
              onChange={(e) => setNoteVal(e.target.value)}
              onBlur={(e) => {
                updateEntryState(e, "note");
              }}
            />
          </div>
        </Grid>
      </Grid>
      <ExcludedUsersModal
        open={showExcludeUsersModal}
        setOpen={setShowExcludeUsersModal}
        entry={entry}
        users={users}
        entries={entries}
        setEntries={setEntries}
      />
    </motion.div>
  );
};
