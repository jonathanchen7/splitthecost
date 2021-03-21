import * as React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { SheetContext } from "../pages/SplitTheCost";
import { useContext, useState } from "react";
import { UserChip } from "../bits/UserChip";
import { UserContext } from "../../App";
import { User } from "../../models/models";
import { ModalHeader } from "./ModalHeader";
import { handleKeyPress } from "../../logic/logic";

interface Props {
  open: boolean;
}

export const PasswordUserModal: React.FC<Props> = ({ open }) => {
  const { sheetState } = useContext(SheetContext);
  const { userState, userDispatch } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState<User>();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  function validatePassword() {
    if (!password) {
      setValidPassword(false);
      return;
    }

    if (!sheetState.password) {
      userDispatch({ type: "setAuthStatus", authenticated: true });
      return;
    }

    const bcrypt = require("bcryptjs");
    bcrypt.compare(
      password,
      sheetState.password,
      function (err: Error, res: boolean) {
        if (!res) {
          setValidPassword(false);
          return;
        }

        userDispatch({ type: "setAuthStatus", authenticated: true });
      }
    );
  }

  function confirmUser() {
    if (selectedUser) {
      userDispatch({
        type: "updateCurUser",
        user: selectedUser!,
      });
    }
  }

  function handleEnter() {
    if (!userState.authenticated) {
      validatePassword();
    } else {
      confirmUser();
    }
  }

  function renderPasswordPrompt(): JSX.Element {
    return (
      <>
        <DialogContent>
          <TextField
            className='bottomMargin'
            fullWidth
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            error={!validPassword}
            helperText={validPassword ? "" : "This password is incorrect."}
            InputProps={{
              type: "password",
            }}
          />
        </DialogContent>
        <DialogActions className='modalActions'>
          <Button
            className='modalConfirmButton rightMarginSmall'
            disabled={!password}
            onClick={validatePassword}
          >
            Confirm
          </Button>
        </DialogActions>
      </>
    );
  }

  function renderUserSelection(): JSX.Element {
    return (
      <>
        <DialogContent>
          {!Object.keys(sheetState.users).length ? (
            <div className='trueCenter'>
              <CircularProgress />
            </div>
          ) : (
            Object.entries(sheetState.users).map((pair) => {
              const user = pair[1];
              return (
                <UserChip
                  className={`bottomMargin rightMargin ${
                    selectedUser?.id === user.id && "selectedChip"
                  }`}
                  user={user}
                  userIdx={Object.keys(sheetState.users).indexOf(user.id)}
                  onClick={setSelectedUser}
                  key={user.id}
                />
              );
            })
          )}
        </DialogContent>
        <DialogActions className='modalActions'>
          <Button
            className='modalConfirmButton rightMarginSmall'
            disabled={!selectedUser}
            onClick={confirmUser}
          >
            Confirm
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <Dialog
      fullWidth={userState.authenticated}
      disableBackdropClick
      maxWidth='sm'
      open={open}
      onKeyPress={(e) => handleKeyPress(e, "enter", handleEnter)}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader
        title={
          userState.authenticated ? "Who are You?" : "Enter Sheet Password"
        }
      />
      {userState.authenticated ? renderUserSelection() : renderPasswordPrompt()}
    </Dialog>
  );
};
