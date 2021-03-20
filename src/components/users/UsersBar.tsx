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
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
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
          Object.keys(sheetState.users).length <= 10 && (
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
          {userState.authenticated && renderUsers()}
        </Grid>
        <Grid item container xs={1} justify='flex-end' alignItems='center'>
          <IconButton
            className='iconButton smallIconButton rightMargin bottomMargin'
            onClick={openSaveSheetModal}
          >
            <ReplyRoundedIcon id='shareIcon' />
          </IconButton>
          {userState.curUser?.id === sheetState.createdBy && (
            <IconButton
              className='iconButton smallIconButton rightMargin bottomMargin'
              onClick={openSettingsModal}
            >
              <SettingsRoundedIcon />
            </IconButton>
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
      <ShareSheetModal open={openSaveSheet} setOpen={setOpenSaveSheet} />
    </>
  );
};
