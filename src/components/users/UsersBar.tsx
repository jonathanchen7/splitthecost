import * as React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddUserModal } from "../modals/AddUserModal";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useState } from "react";
import { SettingsModal } from "../modals/SettingsModal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../pages/SplitTheCost";
import { UserChip } from "../bits/UserChip";
import { RemoveUserModal } from "../modals/RemoveUserModal";
import { User } from "../../models/models";
import { ShareSheetModal } from "../modals/ShareSheetModal";
import ReplyIcon from "@material-ui/icons/Reply";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

export const UsersBar: React.FC = () => {
  const { userState } = useContext(UserContext);
  const { sheetState } = useContext(SheetContext);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSaveSheet, setOpenSaveSheet] = useState(false);

  const [removeUser, setRemoveUser] = useState<User>();

  function openSettingsModal() {
    setOpenSettings(true);
  }

  function openAddUserModal() {
    setOpenAddUser(true);
  }

  function openRemoveUserModal(user: User) {
    setRemoveUser(user);
    setOpenRemoveUser(true);
  }

  function openSaveSheetModal() {
    setOpenSaveSheet(true);
  }

  return (
    <>
      <Grid className='usersBar' container spacing={0}>
        <Grid item xs={12}>
          <IconButton
            className='iconButton smallIconButton leftMargin bottomMargin'
            onClick={openSaveSheetModal}
          >
            <ReplyIcon />
          </IconButton>
          <IconButton
            className='iconButton smallIconButton sideMargins bottomMargin'
            onClick={openSettingsModal}
          >
            <SettingsRoundedIcon />
          </IconButton>
          {userState.curUser && (
            <UserChip className='bottomMargin' user={userState.curUser} />
          )}
          {Object.entries(sheetState.users).map((pair) => {
            const user = pair[1];
            return (
              (!userState.curUser || user.id !== userState.curUser.id) && (
                <UserChip
                  className='bottomMargin leftMargin'
                  user={user}
                  onRemove={userState.curUser && openRemoveUserModal}
                  key={user.id}
                />
              )
            );
          })}
          {userState.curUser && (
            <Tooltip arrow title='Add User' placement='right'>
              <IconButton
                className='iconButton smallIconButton leftMargin bottomMargin'
                onClick={openAddUserModal}
              >
                <AddRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <AddUserModal open={openAddUser} setOpen={setOpenAddUser} />
      <SettingsModal open={openSettings} setOpen={setOpenSettings} />
      {removeUser && (
        <RemoveUserModal
          removeUser={removeUser}
          setRemoveUser={setRemoveUser}
          open={openRemoveUser}
          setOpen={setOpenRemoveUser}
        />
      )}
      <ShareSheetModal open={openSaveSheet} setOpen={setOpenSaveSheet} />
    </>
  );
};
