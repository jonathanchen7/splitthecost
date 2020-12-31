import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { User } from "../../models/models";
import { Avatar } from "@material-ui/core";

interface Props {
  curUser: User;
}

export const Header: React.FC<Props> = ({ curUser }) => {
  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <span className='leftMargin'>split the cost</span>
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        <Avatar className='avatar rightMargin'>{curUser.initials}</Avatar>
      </Grid>
    </Grid>
  );
};
