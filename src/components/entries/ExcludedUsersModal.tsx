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
import { Entry, User } from "../../models/models";
import { useEffect, useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { updateExcludedUsers, getAvatarColor } from "../../actions/actions";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: Entry;
  users: User[];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const ExcludedUsersModal: React.FC<Props> = ({
  open,
  setOpen,
  entry,
  users,
  entries,
  setEntries,
}) => {
  const [includedUsers, setIncludedUsers] = useState<User[]>(
    users.filter((user) => !entry.exclude.includes(user))
  );
  const [excludedUsers, setExcludedUsers] = useState<User[]>(entry.exclude);

  useEffect(() => {
    setIncludedUsers(users.filter((user) => !entry.exclude.includes(user)));
    setExcludedUsers(entry.exclude);
  }, [users, entry, entries]);

  function confirmExcludeUsers() {
    if (entry.exclude !== excludedUsers) {
      updateExcludedUsers(entry, excludedUsers, setEntries);
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
    <Dialog
      fullWidth={true}
      maxWidth='md'
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
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
                {includedUsers.map((user, idx) => (
                  <Draggable draggableId={user.id} index={idx} key={user.id}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='excludeModalChip rightMarginSmall'
                        avatar={
                          <Avatar
                            className='usersBarAvatar'
                            style={{ backgroundColor: getAvatarColor(user) }}
                          >
                            {user.initials}
                          </Avatar>
                        }
                        label={user.displayName}
                        key={user.id}
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
                {excludedUsers.map((user, idx) => (
                  <Draggable draggableId={user.id} index={idx} key={user.id}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='excludeModalChip rightMarginSmall'
                        avatar={
                          <Avatar
                            className='usersBarAvatar'
                            style={{ backgroundColor: getAvatarColor(user) }}
                          >
                            {user.initials}
                          </Avatar>
                        }
                        label={user.displayName}
                        key={user.id}
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
