import * as React from "react";
import { Avatar, Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import { Entry, User } from "../../models/models";
import { AddUserModal } from "./AddUserModal";
import getAvatarColor from "../users/UserAvatar";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { deleteUser } from "../../actions/actions";

interface Props {
  users: User[];
  curUser: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
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

  return (
    <Grid className='usersBar' container spacing={0}>
      <Grid className='usersBarItem' item xs={12}>
        <IconButton
          className='smallIconButton leftMargin'
          size='small'
          onClick={openUsersDialog}
        >
          <SettingsIcon />
        </IconButton>
        {users.map((user) => (
          <Tooltip arrow title={user.email} placement='top'>
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
              label={user.displayName}
              onDelete={
                user === curUser
                  ? undefined
                  : () => deleteUser(user, users, setUsers, setEntries)
              }
              key={user.id}
            />
          </Tooltip>
        ))}
        <Tooltip arrow title='Add User' placement='right'>
          <IconButton
            className='smallIconButton leftMargin'
            size='small'
            onClick={openAddUserDialog}
          >
            <AddIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <span className='leftMargin'>
          <AddUserModal
            open={openAddUser}
            setOpen={setOpenAddUser}
            setUsers={setUsers}
          />
        </span>
      </Grid>
    </Grid>
  );
};
