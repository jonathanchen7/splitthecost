import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { UserAvatar } from "../users/UserAvatar";
import fire from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../App";

export const Header: React.FC = () => {
  const { curUser } = useContext(UserContext);

  function logout() {
    fire.auth().signOut();
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
