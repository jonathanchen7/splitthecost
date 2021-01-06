import * as React from "react";
import {
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Entry, User } from "../../models/models";
import { useState } from "react";
import Grow from "@material-ui/core/Grow";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { setExcludedUsers } from "../../actions/actions";
import getAvatarColor from "../users/UserAvatar";
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
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const ExcludedUsersModal: React.FC<Props> = ({
  open,
  setOpen,
  entry,
  users,
  setEntries,
}) => {
  const [newIncludedUsers, setNewIncludedUsers] = useState<User[]>(
    users.filter((user) => !entry.exclude.includes(user))
  );
  const [newExcludedUsers, setNewExcludedUsers] = useState<User[]>(
    entry.exclude
  );

  function handleClose() {
    setOpen(false);
  }

  function confirmExcludeUsers() {
    setExcludedUsers(entry, users, newExcludedUsers, setEntries);
    handleClose();
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
          ? Array.from(newIncludedUsers)
          : Array.from(newExcludedUsers);

      const user = srcArray[src.index];
      srcArray.splice(src.index, 1);
      srcArray.splice(dest.index, 0, user);
      dest.droppableId === "includeDroppable"
        ? setNewIncludedUsers(srcArray)
        : setNewExcludedUsers(srcArray);
    } else {
      const srcArray =
        src.droppableId === "includeDroppable"
          ? Array.from(newIncludedUsers)
          : Array.from(newExcludedUsers);
      const destArray =
        src.droppableId === "includeDroppable"
          ? Array.from(newExcludedUsers)
          : Array.from(newIncludedUsers);
      const user = srcArray[src.index];
      srcArray.splice(src.index, 1);
      destArray.splice(dest.index, 0, user);
      dest.droppableId === "includeDroppable"
        ? setNewIncludedUsers(destArray)
        : setNewExcludedUsers(destArray);
      dest.droppableId === "includeDroppable"
        ? setNewExcludedUsers(srcArray)
        : setNewIncludedUsers(srcArray);
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth='sm'
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle className='dialogTitle'>
        EXCLUDE USERS - {`${entry.item.toLocaleUpperCase()}`}
      </DialogTitle>
      <DialogContent className='excludeModalContent'>
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
                {newIncludedUsers.map((user, idx) => (
                  <Draggable draggableId={user.id} index={idx} key={user.id}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='excludeModalChip smallRightMargin'
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
                {newExcludedUsers.map((user, idx) => (
                  <Draggable draggableId={user.id} index={idx} key={user.id}>
                    {(provided) => (
                      <Chip
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='excludeModalChip smallRightMargin'
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
      <DialogActions>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={confirmExcludeUsers}>
          <DoneIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
