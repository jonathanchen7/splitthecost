import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { Avatar, IconButton, Input, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry } from "../../models/models";
import NumberFormat from "react-number-format";
import { UserAvatar } from "../bits/UserAvatar";
import { ExcludedUsersModal } from "../modals/ExcludedUsersModal";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { motion } from "framer-motion";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { EntryUserModal } from "../modals/EntryUserModal";
import { RemoveEntryModal } from "../modals/RemoveEntryModal";

interface Props {
  entry: Entry;
  curUserEntry: boolean;
  rowIdx: number;
}

export const EntriesRow: React.FC<Props> = ({
  entry,
  curUserEntry,
  rowIdx,
}) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [emptyRow, setEmptyRow] = useState(
    !entry.item && !entry.cost && !entry.note
  );

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState(entry.item);
  const [note, setNote] = useState(entry.note);
  const [showExcludeUsersModal, setShowExcludeUsersModal] = useState(false);
  const [showEntryUserModal, setShowEntryUserModal] = useState(false);
  const [showRemoveEntryModal, setShowRemoveEntryModal] = useState(false);

  const numExcludeUsersDisplay = curUserEntry ? 3 : 4;

  function updateEntry(
    value: string,
    section: "item" | "cost" | "note",
    local?: boolean
  ) {
    switch (section) {
      case "item":
        sheetDispatch({
          type: "updateEntry",
          entry: entry,
          section: "item",
          value: value,
        });
        setEmptyRow(!item && !entry.cost && !note);
        break;
      case "cost":
        sheetDispatch({
          type: "updateEntry",
          entry: entry,
          section: "cost",
          value: value,
          local: local,
        });
        setEmptyRow(!item && !Number(value) && !note);
        break;
      case "note":
        sheetDispatch({
          type: "updateEntry",
          entry: entry,
          section: "note",
          value: value,
        });
        setEmptyRow(!item && !entry.cost && !note);
        break;
    }
  }

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -2000, opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <Grid
        className={rowIdx % 2 ? "lightRow" : "darkRow"}
        container
        spacing={0}
      >
        <Grid item xs={3}>
          <div
            className='entryDiv'
            onMouseOver={() => setShowDelete(curUserEntry && true)}
            onMouseLeave={() => setShowDelete(false)}
          >
            <UserAvatar
              className='leftMargin'
              user={sheetState.users[entry.user]}
              userIdx={Object.keys(sheetState.users).indexOf(
                sheetState.users[entry.user].id
              )}
              tooltipPlacement='top'
              disabled={emptyRow}
              onClick={() => setShowEntryUserModal(true)}
            />
            <Input
              className='sideMargins'
              disableUnderline
              fullWidth
              readOnly={!curUserEntry}
              value={item}
              placeholder={emptyRow ? "Enter item name here" : undefined}
              onFocus={() => setEmptyRow(false)}
              onChange={(e) => setItem(e.target.value)}
              onBlur={(e) => {
                updateEntry(e.target.value, "item");
              }}
            />
            {showDelete && (
              <IconButton
                className='iconButton largeIconButton rightMargin'
                onClick={() => setShowRemoveEntryModal(true)}
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
                thousandSeparator: ",",
              }}
              disableUnderline
              fullWidth
              readOnly={!curUserEntry}
              value={entry.cost.toFixed(2)}
              onFocus={() => setEmptyRow(false)}
              onChange={(e) => {
                updateEntry(e.target.value, "cost", true);
              }}
              onBlur={(e) => {
                updateEntry(e.target.value, "cost");
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
            onMouseOver={() => setShowEdit(curUserEntry && true)}
            onMouseLeave={() => setShowEdit(false)}
          >
            {entry.exclude.map((userId, idx) => {
              if (idx < numExcludeUsersDisplay) {
                return (
                  <UserAvatar
                    className='leftMarginSmall'
                    user={sheetState.users[userId]}
                    userIdx={Object.keys(sheetState.users).indexOf(
                      sheetState.users[userId].id
                    )}
                    tooltipPlacement='top'
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
              disableUnderline
              fullWidth
              readOnly={!curUserEntry}
              value={note}
              placeholder={emptyRow ? "Include a note here" : undefined}
              onFocus={() => setEmptyRow(false)}
              onChange={(e) => setNote(e.target.value)}
              onBlur={(e) => {
                updateEntry(e.target.value, "note");
              }}
            />
          </div>
        </Grid>
      </Grid>
      <ExcludedUsersModal
        open={showExcludeUsersModal}
        setOpen={setShowExcludeUsersModal}
        entry={entry}
      />
      <EntryUserModal
        open={showEntryUserModal}
        setOpen={setShowEntryUserModal}
        entry={entry}
      />
      <RemoveEntryModal
        open={showRemoveEntryModal}
        setOpen={setShowRemoveEntryModal}
        entry={entry}
      />
    </motion.div>
  );
};
