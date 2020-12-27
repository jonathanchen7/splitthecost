import * as React from "react";
import Grid from '@material-ui/core/Grid';
import { User } from "./HeaderUsers";

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
            <Grid item xs={2}>
                {props.entry.item}
            </Grid>
            <Grid item xs={1}>
                {props.entry.cost}
            </Grid>
            <Grid item xs={2}>
                {props.entry.exclude ? props.entry.exclude[0].firstName : "NONE"}
            </Grid>
            <Grid item xs={4}>
                {props.entry.note}
            </Grid>
        </Grid>
    );
}