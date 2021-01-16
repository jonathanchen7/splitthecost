import * as React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddUserModal } from "../modals/AddUserModal";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useState } from "react";
import { SettingsModal } from "../modals/SettingsModal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";
import { UserChip } from "./UserChip";
import { RemoveUserModal } from "../modals/RemoveUserModal";
import { User } from "../../models/models";
import { SaveSheetModal } from "../modals/SaveSheetModal";

export const UsersBar: React.FC = () => {
  const { appUserData } = useContext(UserContext);
  const { sheetData } = useContext(SheetContext);

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
            className='iconButton smallIconButton leftMargin'
            onClick={openSaveSheetModal}
          >
            <SaveRoundedIcon />
          </IconButton>
          <IconButton
            className='iconButton smallIconButton leftMargin'
            onClick={openSettingsModal}
          >
            <SettingsRoundedIcon />
          </IconButton>
          {!!appUserData.curUser && <UserChip user={appUserData.curUser} />}
          {Object.entries(sheetData.users).map((pair) => {
            const user = pair[1];
            return (
              (!appUserData.curUser || user.id !== appUserData.curUser.id) && (
                <UserChip
                  user={user}
                  onRemove={
                    appUserData.curUser?.id === sheetData.createdBy
                      ? openRemoveUserModal
                      : undefined
                  }
                  key={user.id}
                />
              )
            );
          })}
          {appUserData.curUser?.id === sheetData.createdBy && (
            <Tooltip arrow title='Add User' placement='right'>
              <IconButton
                className='iconButton smallIconButton leftMargin'
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
      <SaveSheetModal open={openSaveSheet} setOpen={setOpenSaveSheet} />
    </>
  );
};
