import { Grid } from "@material-ui/core";
import * as React from "react";

interface Props {}

export const SidebarHeader: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid className='sidebarHeaderItem' item xs={2}></Grid>
      <Grid className='sidebarHeaderItem' item xs={5}>
        <span className='gridHeaderText'>SPENT</span>
      </Grid>
      <Grid className='sidebarHeaderItem' item xs={5}>
        <span className='gridHeaderText'>OWED</span>
      </Grid>
    </Grid>
  );
};
