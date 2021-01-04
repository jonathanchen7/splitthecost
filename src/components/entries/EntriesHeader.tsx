import { Grid } from "@material-ui/core";
import * as React from "react";

interface Props {}

export const EntriesHeader: React.FC<Props> = (props) => {
  return (
    <Grid className='entryHeader' container spacing={0}>
      <Grid item xs={3}>
        <span className='gridHeaderText'>ITEM</span>
      </Grid>
      <Grid item xs={1}>
        <span className='gridHeaderText'>COST</span>
      </Grid>
      <Grid item xs={2}>
        <span className='gridHeaderText'>EXCLUDE</span>
      </Grid>
      <Grid item xs={6}>
        <span className='gridHeaderText'>NOTE</span>
      </Grid>
    </Grid>
  );
};
