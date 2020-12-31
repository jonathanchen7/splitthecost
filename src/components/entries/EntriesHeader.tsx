import { Grid } from "@material-ui/core";
import * as React from "react";

interface Props {}

export const EntriesHeader: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid className='entryHeaderItem' item xs={3}>
        <span className='gridHeaderText'>ITEM</span>
      </Grid>
      <Grid className='entryHeaderItem' item xs={1}>
        <span className='gridHeaderText'>COST</span>
      </Grid>
      <Grid className='entryHeaderItem' item xs={2}>
        <span className='gridHeaderText'>EXCLUDE</span>
      </Grid>
      <Grid className='lastEntryHeaderItem' item xs={6}>
        <span className='gridHeaderText'>NOTES</span>
      </Grid>
    </Grid>
  );
};
