import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import NumberFormat from "react-number-format";
import { User } from "../../../models/models";
import { UserAvatar } from "../../users/UserAvatar";

interface Props {
  curUser: User;
  user: User;
  users: { [id: string]: User };
  data?: { theyOwe: number; youOwe: number };
  idx: number;
}

export const BreakdownRow: React.FC<Props> = ({
  curUser,
  user,
  users,
  data,
  idx,
}) => {
  const netCost: number = !!data ? data.theyOwe - data.youOwe : 0;
  const debtedUser: User = netCost < 0 ? curUser : user;
  const owedUser: User = netCost < 0 ? user : curUser;

  return (
    <Grid
      className={
        (idx === Object.keys(users).length - 1 ? "roundedBottom " : "") +
        (idx % 2 ? "oddIdx" : "evenIdx")
      }
      container
      spacing={0}
    >
      <Grid className='sideDialogRow' item xs={2}>
        <UserAvatar
          className='leftMargin'
          user={debtedUser}
          tooltipPlacement='left'
        />
      </Grid>
      <Grid className='sideDialogRow' item xs={3}>
        <div className={`arrow ${netCost < 0 ? "redArrow" : "greenArrow"}`}>
          <span className='leftMargin'>
            {netCost < 0 ? "YOU OWE" : "OWES YOU"}
          </span>
        </div>
      </Grid>
      <Grid className='sideDialogRow' item xs={3}>
        <UserAvatar user={owedUser} tooltipPlacement='top' />
      </Grid>
      <Grid className='sideDialogRow' item xs={4}>
        <Input
          readOnly={true}
          inputComponent={NumberFormat as any}
          inputProps={{
            decimalScale: 2,
            allowNegative: false,
            thousandSeparator: ",",
          }}
          className='sideMargins'
          disableUnderline={true}
          fullWidth={true}
          value={Math.abs(netCost).toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
};
