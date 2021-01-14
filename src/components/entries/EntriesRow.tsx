import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { Avatar, IconButton, Input, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Entry } from "../../models/models";
// import NumberFormat from "react-number-format";
import { UserAvatar } from "../users/UserAvatar";
import { ExcludedUsersModal } from "../modals/ExcludedUsersModal";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";

interface Props {
  entry: Entry;
}

export const EntriesRow: React.FC<Props> = ({ entry }) => {
  const { sheetData, sheetDispatch } = useContext(SheetContext);
  const { curUser } = useContext(UserContext);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [itemVal, setItemVal] = useState(entry.item);
  const [noteVal, setNoteVal] = useState(entry.note);
  const [showExcludeUsersModal, setShowExcludeUsersModal] = useState(false);

  const numExcludeUsersDisplay = entry.createdBy === curUser.id ? 3 : 4;

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
        className={sheetData.entries.indexOf(entry) % 2 ? "oddIdx" : "evenIdx"}
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
              user={sheetData.users[entry.createdBy]}
              tooltipPlacement='top'
            />
            <Input
              className='sideMargins'
              disableUnderline={true}
              fullWidth={true}
              value={itemVal}
              onChange={(e) => setItemVal(e.target.value)}
              onBlur={(e) => {
                sheetDispatch({
                  type: "updateEntry",
                  entry: entry,
                  section: "item",
                  value: e.target.value,
                });
              }}
            />
            {showDelete && (
              <IconButton
                className='iconButton largeIconButton rightMargin'
                onClick={() =>
                  sheetDispatch({ type: "removeEntry", entryId: entry.id })
                }
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
              // inputComponent={NumberFormat as any}
              // inputProps={{
              //   decimalScale: 2,
              //   allowNegative: false,
              //   thousandSeparator: ",",
              // }}
              disableUnderline={true}
              fullWidth={true}
              value={entry.cost.toFixed(2)}
              onChange={(e) => {
                sheetDispatch({
                  type: "updateEntry",
                  entry: entry,
                  section: "cost",
                  value: e.target.value,
                });
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
                    user={sheetData.users[userId]}
                    tooltipPlacement='top'
                    iconOnHover={<DeleteIcon />}
                    onClick={() => {
                      sheetDispatch({
                        type: "removeExcludedUser",
                        userId: userId,
                        entry: entry,
                      });
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
                sheetDispatch({
                  type: "updateEntry",
                  entry: entry,
                  section: "note",
                  value: e.target.value,
                });
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
    </motion.div>
  );
};
