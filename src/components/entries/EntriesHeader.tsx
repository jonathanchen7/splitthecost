import { Grid } from "@material-ui/core";
import * as React from "react";

export const EntriesHeader: React.FC = () => {
  return (
    <Grid className='gridHeader' container spacing={0}>
      <Grid item xs={3}>
        <span className='leftMargin'>ITEM</span>
      </Grid>
      <Grid item xs={1}>
        <span className='leftMargin'>COST</span>
      </Grid>
      <Grid item xs={2}>
        <span className='leftMargin'>EXCLUDE</span>
      </Grid>
      <Grid item xs={6}>
        <span className='leftMargin'>NOTE</span>
      </Grid>
    </Grid>
  );
};
