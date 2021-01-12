import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { User } from "../../models/models";
import { Avatar } from "@material-ui/core";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  curUser: User;
}

export const Header: React.FC<Props> = ({ curUser }) => {
  function logout() {
    console.log("LOGGED OUT!");
  }

  function login() {}

  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <span className='leftMargin'>split the cost</span>
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        <UserAvatar
          className='rightMargin'
          user={curUser}
          tooltipPlacement={"left"}
          onClick={logout}
        />
      </Grid>
    </Grid>
  );
};
