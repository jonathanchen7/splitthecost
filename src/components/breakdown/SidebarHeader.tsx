import { Grid } from "@material-ui/core";
import * as React from "react";

interface Props {}

export const SidebarHeader: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid className='entryHeaderItem' item xs={2}></Grid>
      <Grid className='entryHeaderItem' item xs={5}>
        <span className='entryHeaderText'>SPENT</span>
      </Grid>
      <Grid className='entryHeaderItem' item xs={5}>
        <span className='entryHeaderText'>OWED</span>
      </Grid>
    </Grid>
  );
};
