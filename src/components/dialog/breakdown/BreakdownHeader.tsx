import { Grid } from "@material-ui/core";
import * as React from "react";

export const BreakdownHeader: React.FC = () => {
  return (
    <Grid className='gridHeader roundedTop' container spacing={0}>
      <Grid item xs={8}>
        <span className='leftMargin'>TRANSACTIONS</span>
      </Grid>
      <Grid item xs={4}>
        <span className='leftMargin'>TOTAL</span>
      </Grid>
    </Grid>
  );
};
