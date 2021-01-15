import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { UserAvatar } from "../users/UserAvatar";
import fire from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../SplitTheCost";

export const Header: React.FC = () => {
  const { sheetData } = useContext(SheetContext);
  const { appUserData } = useContext(UserContext);

  function logout() {
    fire.auth().signOut();
  }

  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <span className='leftMargin'>
          split the cost | <b>{sheetData.title}</b>
        </span>
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        {!!appUserData.curUser && (
          <UserAvatar
            className='rightMargin'
            user={appUserData.curUser}
            tooltipPlacement={"bottom"}
            onClick={logout}
          />
        )}
      </Grid>
    </Grid>
  );
};
