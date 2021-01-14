import { Grid, Input, InputAdornment } from "@material-ui/core";
import * as React from "react";
import NumberFormat from "react-number-format";
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
  const { sheetData } = useContext(SheetContext);

  return (
    <Grid
      className={
        (idx === Object.keys(sheetData.users).length - 1
          ? "roundedBottom "
          : "") + (idx % 2 ? "evenIdx" : "oddIdx")
      }
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
          className='sideMargins'
          disableUnderline={true}
          fullWidth={true}
          value={data?.totalOwed.toFixed(2)}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
};
