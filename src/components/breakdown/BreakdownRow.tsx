import { Grid } from "@material-ui/core";
import * as React from "react";
import { User } from "../../models/models";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  curUser: User;
  user: User;
  users: User[];
  data?: { theyOwe: number; youOwe: number };
}

export const BreakdownRow: React.FC<Props> = ({
  curUser,
  user,
  users,
  data,
}) => {
  const netCost: number = !!data ? data.theyOwe - data.youOwe : 0;

  return (
    <Grid
      className={
        (users.indexOf(user) === users.length - 1 ? "roundedBottom " : "") +
        (users.indexOf(user) % 2 ? "oddIdx" : "evenIdx")
      }
      container
      spacing={0}
    >
      <Grid className='breakdownRowDiv' item xs={3}>
        <span className='leftMargin'>
          {netCost !== 0 && netCost < 0 ? (
            "YOU OWE "
          ) : (
            <UserAvatar user={user} tooltipPlacement='top' />
          )}
        </span>
      </Grid>
      <Grid className='breakdownRowDiv' item xs={3}>
        <span className='leftMargin'>
          {netCost !== 0 && netCost < 0 ? (
            <UserAvatar user={user} tooltipPlacement='top' />
          ) : (
            " OWES YOU"
          )}
        </span>
      </Grid>
      <Grid className='breakdownRowDiv' item xs={6}>
        <span className='leftMargin'>${Math.abs(netCost).toFixed(2)}</span>
      </Grid>
    </Grid>
  );
};
