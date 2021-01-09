import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import NumberFormat from "react-number-format";
import { User } from "../../../models/models";
import { UserAvatar } from "../../users/UserAvatar";

interface Props {
  user: User;
  users: User[];
  data: { totalSpent: number; totalOwed: number };
}

export const OverviewRow: React.FC<Props> = ({ user, users, data }) => {
  return (
    <Grid
      className={
        (users.indexOf(user) === users.length - 1 ? "roundedBottom " : "") +
        (users.indexOf(user) % 2 ? "evenIdx" : "oddIdx")
      }
      container
      spacing={0}
    >
      <Grid className='sideDialogRow' item xs={2}>
        <span className='leftMargin'>
          <UserAvatar user={user} tooltipPlacement='left' />
        </span>
      </Grid>
      <Grid className='sideDialogRow' item xs={5}>
        <Input
          className='entryInput'
          readOnly={true}
          inputComponent={NumberFormat as any}
          inputProps={{
            decimalScale: 2,
            allowNegative: false,
            thousandSeparator: ",",
          }}
          disableUnderline={true}
          fullWidth={true}
          value={data?.totalSpent.toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
      <Grid className='sideDialogRow' item xs={5}>
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
          value={data?.totalOwed.toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
};
