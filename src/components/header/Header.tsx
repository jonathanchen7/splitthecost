import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { AutosaveMessage } from "../bits/AutosaveMessage";
import { SaveState } from "../../models/models";

interface Props {
  saveState: SaveState;
}

export const Header: React.FC<Props> = ({ saveState }) => {
  const { sheetState } = useContext(SheetContext);

  return (
    <Grid container spacing={0}>
      <Grid className='header' item xs={12}>
        <span className='leftMargin'>
          split the cost | <b>{sheetState.title}</b>
        </span>
        <AutosaveMessage saveState={saveState} />
      </Grid>
    </Grid>
  );
};
