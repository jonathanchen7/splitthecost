import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { User } from "../../models/models";
import { UserAvatar } from "../users/UserAvatar";
import fire from "../../firebase";

interface Props {
  curUser: User;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ curUser, setLoggedIn }) => {
  function logout() {
    fire.auth().signOut();
    setLoggedIn(false);
    // console.log("LOGGED OUT!");
  }

  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <span className='leftMargin'>split the cost</span>
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        <UserAvatar
          className='rightMargin'
          user={curUser}
          tooltipPlacement={"bottom"}
          onClick={logout}
        />
      </Grid>
    </Grid>
  );
};
