import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";

export const Header: React.FC = () => {
  const { sheetState } = useContext(SheetContext);

  return (
    <Grid container spacing={0}>
      <Grid className='header' item xs={12}>
        <span className='leftMargin'>
          split the cost | <b>{sheetState.title}</b>
        </span>
      </Grid>
    </Grid>
  );
};
