import * as React from "react";
import { Avatar, Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import { Entry, User } from "../../models/models";
import { AddUserModal } from "../modals/AddUserModal";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { deleteUser, getAvatarColor } from "../../actions/actions";
import { SettingsModal } from "../modals/SettingsModal";

interface Props {
  users: User[];
  entries: Entry[];
  curUser: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const UsersBar: React.FC<Props> = ({
  users,
  entries,
  curUser,
  setUsers,
  setEntries,
}) => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  function openSettingsModal() {
    setOpenSettings(true);
  }

  function openAddUserModal() {
    setOpenAddUser(true);
  }

  return (
    <div>
      <Grid className='usersBar' container spacing={0}>
        <Grid item xs={12}>
          <IconButton
            className='iconButton smallIconButton leftMargin'
            onClick={openSettingsModal}
          >
            <SettingsIcon />
          </IconButton>
          {users.map((user) => (
            <Tooltip arrow title={user.email} placement='top' key={user.id}>
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
                  user !== curUser
                    ? () =>
                        deleteUser(user, users, entries, setUsers, setEntries)
                    : undefined
                }
                key={user.id}
              />
            </Tooltip>
          ))}
          <Tooltip arrow title='Add User' placement='right'>
            <IconButton
              className='iconButton smallIconButton leftMargin'
              onClick={openAddUserModal}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <AddUserModal
        open={openAddUser}
        setOpen={setOpenAddUser}
        setUsers={setUsers}
      />
      <SettingsModal open={openSettings} setOpen={setOpenSettings} />
    </div>
  );
};
