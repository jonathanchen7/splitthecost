import * as React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddUserModal } from "../modals/AddUserModal";
import { useState } from "react";
import { SettingsModal } from "../modals/SettingsModal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../pages/SplitTheCost";
import { UserChip } from "../bits/UserChip";
import { RemoveUserModal } from "../modals/RemoveUserModal";
import { User } from "../../models/models";
import { SaveSheetModal } from "../modals/SaveSheetModal";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';

export const UsersBar: React.FC = () => {
  const { userState, userDispatch } = useContext(UserContext);
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

  function changeUser() {
    userDispatch({ type: "removeCurUser" })
  }

  function renderUsers(): JSX.Element {
    return (
      <>
        {userState.curUser && (
          <UserChip
            className='leftMargin bottomMargin'
            user={userState.curUser}
            userIdx={Object.keys(sheetState.users).indexOf(
              userState.curUser.id
            )}
          />
        )}
        {Object.entries(sheetState.users).map((pair) => {
          const user = pair[1];
          return (
            (!userState.curUser || user.id !== userState.curUser.id) && (
              <UserChip
                className='leftMargin bottomMargin'
                user={user}
                userIdx={Object.keys(sheetState.users).indexOf(user.id)}
                onRemove={
                  !sheetState.readOnly &&
                  userState.curUser &&
                  sheetState.createdBy !== user.id
                    ? openRemoveUserModal
                    : undefined
                }
                key={user.id}
              />
            )
          );
        })}
        {!sheetState.readOnly &&
          userState.curUser &&
          Object.keys(sheetState.users).length < 10 && (
            <Tooltip arrow title='Add Friend' placement='right'>
              <IconButton
                className='iconButton smallIconButton leftMargin bottomMargin'
                onClick={openAddUserModal}
              >
                <AddRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
      </>
    );
  }

  return (
    <>
      <Grid className='usersBar' container spacing={0}>
        <Grid item container xs={11} alignItems='center'>
          {userState.curUser && (
            <Tooltip arrow title='Change User' placement='right'>
              <IconButton
                className='iconButton smallIconButton leftMargin bottomMargin'
                onClick={changeUser}
              >
                <PersonRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
          {userState.authenticated && renderUsers()}
        </Grid>
        <Grid item container xs={1} justify='flex-end' alignItems='center'>
            <Tooltip arrow title='Toggle Dark Mode' placement='left'>
              <IconButton
                className='iconButton smallIconButton rightMargin bottomMargin'
                onClick={() => userDispatch({ type: "setDarkMode", darkMode: !userState.darkMode })}
              >
                <Brightness4RoundedIcon />
              </IconButton>
            </Tooltip>
          {sheetState.local && (
            <Tooltip arrow title='Save Sheet' placement='left'>
              <IconButton
                className='iconButton smallIconButton rightMargin bottomMargin'
                onClick={openSaveSheetModal}
              >
                <SaveRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
          {userState.curUser?.id === sheetState.createdBy && (
            <Tooltip arrow title='Settings' placement='left'>
              <IconButton
                className='iconButton smallIconButton rightMargin bottomMargin'
                onClick={openSettingsModal}
              >
                <SettingsRoundedIcon />
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
          open={openRemoveUser}
          setOpen={setOpenRemoveUser}
        />
      )}
      <SaveSheetModal open={openSaveSheet} setOpen={setOpenSaveSheet} />
    </>
  );
};
