import { Grid } from "@material-ui/core";
import * as React from "react";

export const BreakdownHeader: React.FC = () => {
  return (
    <Grid className='breakdownHeader' container spacing={0}>
      <Grid item xs={8}>
        <span className='gridHeaderText'>TRANSACTIONS</span>
      </Grid>
      <Grid item xs={4}>
        <span className='gridHeaderText'>TOTAL</span>
      </Grid>
    </Grid>
  );
};
