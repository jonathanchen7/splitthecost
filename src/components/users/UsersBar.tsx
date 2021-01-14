import * as React from "react";
import { Avatar, Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddUserModal } from "../modals/AddUserModal";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { getAvatarColor } from "../../actions/actions";
import { SettingsModal } from "../modals/SettingsModal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";

export const UsersBar: React.FC = () => {
  const { sheetData, sheetDispatch } = useContext(SheetContext);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const { curUser } = useContext(UserContext);

  function openSettingsModal() {
    setOpenSettings(true);
  }

  function openAddUserModal() {
    setOpenAddUser(true);
  }

  return (
    <>
      <Grid className='usersBar' container spacing={0}>
        <Grid item xs={12}>
          <IconButton
            className='iconButton smallIconButton leftMargin'
            onClick={openSettingsModal}
          >
            <SettingsIcon />
          </IconButton>
          {Object.entries(sheetData.users).map((pair) => {
            const user = pair[1];
            return (
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
                          sheetDispatch({ type: "removeUser", userId: user.id })
                      : undefined
                  }
                  key={user.id}
                />
              </Tooltip>
            );
          })}
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
      <AddUserModal open={openAddUser} setOpen={setOpenAddUser} />
      <SettingsModal open={openSettings} setOpen={setOpenSettings} />
    </>
  );
};
