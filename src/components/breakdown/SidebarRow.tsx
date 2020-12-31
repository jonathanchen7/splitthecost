import { Grid } from "@material-ui/core";
import * as React from "react";
import { Entry, User } from "../../models/models";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  user: User;
  users: User[];
  entries: Entry[];
}

export const SidebarRow: React.FC<Props> = ({ user, users, entries }) => {
  return (
    <Grid
      className={users.indexOf(user) % 2 ? "evenIdx" : "oddIdx"}
      container
      spacing={0}
    >
      <Grid className='overviewDiv' item xs={2}>
        <UserAvatar user={user} tooltipPlacement='left' />
      </Grid>
      <Grid className='overviewDiv' item xs={5}></Grid>
      <Grid className='overviewDiv' item xs={5}></Grid>
    </Grid>
  );
};
