import * as React from "react";
import Grid from '@material-ui/core/Grid';
import { User } from "./HeaderUsers";
import { EntryText } from "./EntryText";
import { Box } from "@material-ui/core";

export interface EntryItem {
    id: number;
    item: string;
    cost: number;
    exclude: User[] | null;
    note: string;
}

interface Props {
    entry: EntryItem;
}

export const Entry: React.FC<Props> = (props) => {
    return (
        <Grid className={props.entry.id % 2 ? "entry oddId" : "entry evenId"} container spacing={0}>
            <Grid className="entryItemContainer" item xs={2}>
                <EntryText text={props.entry.item} />
            </Grid>
            <Grid className="entryItemContainer" item xs={1}>
                <EntryText text={props.entry.cost} />
            </Grid>
            <Grid className="entryItemContainer" item xs={2}>
                
            </Grid>
            <Grid className="entryItemContainer" item xs={4}>
                <EntryText text={props.entry.note} />
            </Grid>
        </Grid>
    );
}