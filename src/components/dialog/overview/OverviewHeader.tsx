import { Grid } from "@material-ui/core";
import * as React from "react";

export const OverviewHeader: React.FC = () => {
  return (
    <Grid className='gridHeader roundedTop' container spacing={0}>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <span className='leftMargin'>TOTAL SPENT</span>
      </Grid>
      <Grid item xs={5}>
        <span className='leftMargin'>TOTAL OWED</span>
      </Grid>
    </Grid>
  );
};
