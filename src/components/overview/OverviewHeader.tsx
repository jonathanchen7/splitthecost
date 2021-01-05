import { Grid } from "@material-ui/core";
import * as React from "react";

export const OverviewHeader: React.FC = () => {
  return (
    <Grid className='overviewHeader' container spacing={0}>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <span className='gridHeaderText'>TOTAL SPENT</span>
      </Grid>
      <Grid item xs={5}>
        <span className='gridHeaderText'>TOTAL OWED</span>
      </Grid>
    </Grid>
  );
};
