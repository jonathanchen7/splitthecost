import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import { useContext } from "react";
import NumberFormat from "react-number-format";
import { UserContext } from "../../../App";
import { User } from "../../../models/models";
import { SheetContext } from "../../SplitTheCost";
import { UserAvatar } from "../../users/UserAvatar";

interface Props {
  user: User;
  data?: { theyOwe: number; youOwe: number };
  idx: number;
}

export const BreakdownRow: React.FC<Props> = ({ user, data, idx }) => {
  const { sheetState } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  const netCost = data ? data.theyOwe - data.youOwe : 0;
  const debtedUser = netCost < 0 ? userState.curUser! : user;
  const owedUser = netCost < 0 ? user : userState.curUser!;

  return (
    <Grid
      className={`${idx % 2 ? "lightRow" : "darkRow"} ${
        idx === sheetState.numUsers - 2 && "roundedBottom"
      }`}
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
          className='sideMargins'
          readOnly
          disableUnderline
          fullWidth
          inputComponent={NumberFormat as any}
          inputProps={{
            decimalScale: 2,
            allowNegative: false,
            thousandSeparator: ",",
          }}
          value={Math.abs(netCost).toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
};
