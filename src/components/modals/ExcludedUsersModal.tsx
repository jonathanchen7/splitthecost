import * as React from "react";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import { Entry } from "../../models/models";
import { useEffect, useState, useContext } from "react";
import { getAvatarColor } from "../../actions/sheetActions";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { SheetContext } from "../SplitTheCost";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: Entry;
}

export const ExcludedUsersModal: React.FC<Props> = ({
  open,
  setOpen,
  entry,
}) => {
  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [includedUsers, setIncludedUsers] = useState<string[]>(
    Object.keys(sheetState.users).filter(
      (userId) => !entry.exclude.includes(userId)
    )
  );
  const [excludedUsers, setExcludedUsers] = useState<string[]>(entry.exclude);

  useEffect(() => {
    setIncludedUsers(
      Object.keys(sheetState.users).filter(
        (userId) => !entry.exclude.includes(userId)
      )
    );
    setExcludedUsers(entry.exclude);
  }, [sheetState, entry.exclude]);

  function confirmExcludeUsers() {
    if (entry.exclude !== excludedUsers) {
      sheetDispatch({
        type: "updateExcludedUsers",
        exclude: excludedUsers,
        entry: entry,
      });
    }

    handleClose();
  }

  function handleClose() {
    setOpen(false);
  }

  function onDragEnd(result: DropResult) {
    const { destination: dest, source: src } = result;

    if (!dest) {
      return;
    }

    if (dest.droppableId === src.droppableId && dest.index === src.index) {
      return;
    }

    if (src.droppableId === dest.droppableId) {
      const srcArray =
        src.droppableId === "includeDroppable"
          ? Array.from(includedUsers)
          : Array.from(excludedUsers);

      const user = srcArray[src.index];
      srcArray.splice(src.index, 1);
      srcArray.splice(dest.index, 0, user);
      dest.droppableId === "includeDroppable"
        ? setIncludedUsers(srcArray)
        : setExcludedUsers(srcArray);
    } else {
      const srcArray =
        src.droppableId === "includeDroppable"
          ? Array.from(includedUsers)
          : Array.from(excludedUsers);
      const destArray =
        src.droppableId === "includeDroppable"
          ? Array.from(excludedUsers)
          : Array.from(includedUsers);
      const user = srcArray[src.index];
      srcArray.splice(src.index, 1);
      destArray.splice(dest.index, 0, user);
      dest.droppableId === "includeDroppable"
        ? setIncludedUsers(destArray)
        : setExcludedUsers(destArray);
      dest.droppableId === "includeDroppable"
        ? setExcludedUsers(srcArray)
        : setIncludedUsers(srcArray);
    }
  }

  return (
    <Dialog fullWidth maxWidth='md' onClose={handleClose} open={open}>
      <DialogTitle className='dialogTitle'>
        Exclude Users | <b>{`${entry.item}`}</b>
      </DialogTitle>
      <DialogContent className='modalContent excludeModalContent' dividers>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"includeDroppable"}>
            {(provided) => (
              <Paper
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                className='excludeModalPaper'
                elevation={2}
              >
                <div className='excludeModalPaperHeader'>INCLUDED USERS</div>
                {includedUsers.map((userId, idx) => (
                  <Draggable draggableId={userId} index={idx} key={userId}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='chip bottomMargin rightMarginSmall'
                        avatar={
                          <Avatar
                            className='smallAvatar'
                            style={{
                              backgroundColor: getAvatarColor(
                                sheetState.users[userId]
                              ),
                            }}
                          >
                            {sheetState.users[userId].initials}
                          </Avatar>
                        }
                        label={sheetState.users[userId].displayName}
                        key={userId}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
          <Droppable droppableId={"excludeDroppable"}>
            {(provided) => (
              <Paper
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                className='excludeModalPaper'
                elevation={2}
              >
                <div className='excludeModalPaperHeader'>EXCLUDED USERS</div>
                {excludedUsers.map((userId, idx) => (
                  <Draggable draggableId={userId} index={idx} key={userId}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='chip bottomMargin rightMarginSmall'
                        avatar={
                          <Avatar
                            className='smallAvatar'
                            style={{
                              backgroundColor: getAvatarColor(
                                sheetState.users[userId]
                              ),
                            }}
                          >
                            {sheetState.users[userId].initials}
                          </Avatar>
                        }
                        label={sheetState.users[userId].displayName}
                        key={userId}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions className='modalActions'>
        <Button className='modalCancelButton' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className='modalConfirmButton rightMarginSmall'
          onClick={confirmExcludeUsers}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
