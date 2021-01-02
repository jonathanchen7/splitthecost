import { Grid } from "@material-ui/core";
import * as React from "react";

export const OverviewHeader: React.FC = () => {
  return (
    <Grid className='overviewHeader' container spacing={0}>
      <Grid item xs={6}>
        <span className='gridHeaderText'>SPENT</span>
      </Grid>
      <Grid item xs={6}>
        <span className='gridHeaderText'>OWED</span>
      </Grid>
    </Grid>
  );
};
