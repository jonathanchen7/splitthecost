import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import NumberFormat from "react-number-format";
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
  const debtedUser: User = netCost < 0 ? curUser : user;
  const owedUser: User = netCost < 0 ? user : curUser;

  return (
    <Grid
      className={
        (users.indexOf(user) === users.length - 1 ? "roundedBottom " : "") +
        (users.indexOf(user) % 2 ? "oddIdx" : "evenIdx")
      }
      container
      spacing={0}
    >
      <Grid className='breakdownRowDiv' item xs={2}>
        <span className='leftMargin'>
          <UserAvatar user={debtedUser} tooltipPlacement='left' />
        </span>
      </Grid>
      <Grid className='breakdownRowDiv' item xs={3}>
        <div className={`arrow ${netCost < 0 ? "redArrow" : "greenArrow"}`}>
          <span className='leftMargin'>
            {netCost < 0 ? "YOU OWE" : "OWES YOU"}
          </span>
        </div>
      </Grid>
      <Grid className='breakdownRowDiv' item xs={3}>
        <span>
          <UserAvatar user={owedUser} tooltipPlacement='left' />
        </span>
      </Grid>
      <Grid className='breakdownRowDiv' item xs={4}>
        <Input
          readOnly={true}
          inputComponent={NumberFormat as any}
          inputProps={{
            decimalScale: 2,
            allowNegative: false,
            thousandSeparator: ",",
          }}
          className='entryInput'
          disableUnderline={true}
          fullWidth={true}
          value={Math.abs(netCost).toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
        <span className='leftMargin'></span>
      </Grid>
    </Grid>
  );
};
