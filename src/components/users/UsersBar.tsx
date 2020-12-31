import * as React from "react";
import {
  Avatar,
  Badge,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Entry, User } from "../../models/models";
import { AddUserDialog } from "./AddUserDialog";
import { getAvatarColor } from "../users/UserAvatar";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";

interface Props {
  users: User[];
  curUser: User;
  setUsers: (users: User[]) => void;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const UsersBar: React.FC<Props> = ({
  users,
  curUser,
  setUsers,
  setEntries,
}) => {
  const [openAddUser, setOpenAddUser] = useState(false);

  function openUsersDialog() {}

  function openAddUserDialog() {
    setOpenAddUser(true);
  }

  function deleteUser(user: User) {
    // Delete user from user state.
    setUsers(users.filter((cur) => user !== cur));
    // Delete all entries associated with user from user state.
    setEntries((entries) =>
      entries.filter((entry) => entry.createdBy !== user)
    );
  }

  return (
    <Grid className='usersBar' container spacing={0}>
      <Grid className='usersBarItem' item xs={12}>
        <Badge
          className='leftMargin'
          badgeContent={users.length}
          color='primary'
          overlap='circle'
        >
          <IconButton
            className='smallIconButton'
            size='small'
            onClick={openUsersDialog}
          >
            <PeopleIcon fontSize='small' />
          </IconButton>
        </Badge>
        {users.map((user) => (
          <Chip
            className='usersBarChip leftMargin'
            avatar={
              <Avatar
                className='usersBarAvatar'
                style={{ backgroundColor: getAvatarColor(user) }}
              >
                {user.initials}
              </Avatar>
            }
            label={`${user.firstName} ${user.lastName}`}
            onDelete={user === curUser ? undefined : () => deleteUser(user)}
            key={user.id}
          />
        ))}
        <Tooltip
          className='leftMargin'
          arrow
          title='Add User'
          placement='right'
        >
          <IconButton
            className='smallIconButton'
            size='small'
            onClick={openAddUserDialog}
          >
            <AddIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <span className='leftMargin'>
          <AddUserDialog
            open={openAddUser}
            setOpen={setOpenAddUser}
            users={users}
            setUsers={setUsers}
          />
        </span>
      </Grid>
    </Grid>
  );
};
