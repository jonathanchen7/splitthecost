import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
// import NumberFormat from "react-number-format";
import { User } from "../../../models/models";
import { UserAvatar } from "../../users/UserAvatar";
import { SheetContext } from "../../SplitTheCost";
import { useContext } from "react";

interface Props {
  user: User;
  data: { totalSpent: number; totalOwed: number };
  idx: number;
}

export const OverviewRow: React.FC<Props> = ({ user, data, idx }) => {
  const { sheetState } = useContext(SheetContext);

  return (
    <Grid
      className={`${idx % 2 ? "lightRow" : "darkRow"} ${
        idx === sheetState.numUsers - 1 && "roundedBottom"
      }`}
      container
      spacing={0}
    >
      <Grid className='sideDialogRow' item xs={2}>
        <UserAvatar
          className='leftMargin'
          user={user}
          tooltipPlacement='left'
        />
      </Grid>
      <Grid className='sideDialogRow' item xs={5}>
        <Input
          className='sideMargins'
          readOnly
          disableUnderline
          fullWidth
          // inputComponent={NumberFormat as any}
          // inputProps={{
          //   decimalScale: 2,
          //   allowNegative: false,
          //   thousandSeparator: ",",
          // }}
          value={!!data ? data?.totalSpent.toFixed(2) : 0}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
      <Grid className='sideDialogRow' item xs={5}>
        <>
          <Input
            readOnly
            disableUnderline
            fullWidth
            // inputComponent={NumberFormat as any}
            // inputProps={{
            //   decimalScale: 2,
            //   allowNegative: false,
            //   thousandSeparator: ",",
            // }}
            className='sideMargins'
            value={!!data ? data?.totalOwed.toFixed(2) : 0}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </>
      </Grid>
    </Grid>
  );
};
