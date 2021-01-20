import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { UserAvatar } from "../bits/UserAvatar";
import { useContext } from "react";
import { UserContext } from "../../App";
import { SheetContext } from "../pages/SplitTheCost";

export const Header: React.FC = () => {
  const { sheetState } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <span className='leftMargin'>
          split the cost | <b>{sheetState.title}</b>
        </span>
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        {userState.curUser && (
          <UserAvatar
            className='rightMargin'
            user={userState.curUser}
            tooltipPlacement={"bottom"}
          />
        )}
      </Grid>
    </Grid>
  );
};
