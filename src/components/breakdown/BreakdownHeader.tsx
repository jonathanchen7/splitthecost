import { Grid } from "@material-ui/core";
import * as React from "react";
import { UserBreakdownData } from "../../models/models";

export const BreakdownHeader: React.FC = () => {
  return (
    <Grid className='breakdownHeader' container spacing={0}>
      <Grid item xs={6}>
        <span className='gridHeaderText'>TRANSACTIONS</span>
      </Grid>
      <Grid item xs={6}>
        <span className='gridHeaderText'>COST</span>
      </Grid>
    </Grid>
  );
};
