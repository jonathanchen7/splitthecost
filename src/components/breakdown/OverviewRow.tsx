import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import NumberFormat from "react-number-format";
import { User } from "../../models/models";
import { UserAvatar } from "../users/UserAvatar";

interface Props {
  user: User;
  users: User[];
  data: { totalSpent: number; totalOwed: number };
}

export const OverviewRow: React.FC<Props> = ({ user, users, data }) => {
  return (
    <Grid
      className={users.indexOf(user) % 2 ? "evenIdx" : "oddIdx"}
      container
      spacing={0}
    >
      <Grid className='overviewDiv' item xs={2}>
        <UserAvatar user={user} tooltipPlacement='left' />
      </Grid>
      <Grid className='overviewDiv' item xs={5}>
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
          value={data?.totalSpent}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
      <Grid className='overviewDiv' item xs={5}>
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
          value={data?.totalOwed}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
};
