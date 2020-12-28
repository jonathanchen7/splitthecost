import { Grid } from "@material-ui/core";
import * as React from "react";

interface Props {

}

export const EntriesHeader: React.FC<Props> = (props) => {
    return (
        <Grid container spacing={0}>
            <Grid className="entryHeaderItemContainer" item xs={2}>
                <span className="entryHeaderText">ITEM</span>
            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={1}>
                <span className="entryHeaderText">COST</span>
            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={2}>
                <span className="entryHeaderText">EXCLUDE</span>
            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={4}>
                <span className="entryHeaderText">NOTES</span>
            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={1}>

            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={1}>
                <span className="entryHeaderText">SPENT</span>
            </Grid>
            <Grid className="entryHeaderItemContainer" item xs={1}>
                <span className="entryHeaderText">OWED</span>
            </Grid>
        </Grid>
    );
}