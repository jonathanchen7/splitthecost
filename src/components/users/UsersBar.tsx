import * as React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddUserModal } from "../modals/AddUserModal";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { SettingsModal } from "../modals/SettingsModal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";
import { UserChip } from "./UserChip";
import { RemoveUserModal } from "../modals/RemoveUserModal";
import { User } from "../../models/models";

export const UsersBar: React.FC = () => {
  const { curUser } = useContext(UserContext);
  const { sheetData } = useContext(SheetContext);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openRemoveUser, setOpenRemoveUser] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

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
          {!!curUser && <UserChip user={curUser} />}
          {Object.entries(sheetData.users).map((pair) => {
            const user = pair[1];
            return (
              (!curUser || user.id !== curUser.id) && (
                <UserChip
                  user={user}
                  onRemove={
                    curUser?.id === sheetData.createdBy
                      ? openRemoveUserModal
                      : undefined
                  }
                />
              )
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
      {removeUser && (
        <RemoveUserModal
          removeUser={removeUser}
          setRemoveUser={setRemoveUser}
          open={openRemoveUser}
          setOpen={setOpenRemoveUser}
        />
      )}
    </>
  );
};
