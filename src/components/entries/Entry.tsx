import * as React from "react";
import Grid from '@material-ui/core/Grid';
import { User } from "../header/HeaderUsers";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "@material-ui/core";

export interface EntryItem {
    id: number;
    item: string;
    cost: number;
    exclude: User[] | null;
    note: string;
}

interface Props {
    id: number;
    item?: string;
    cost?: number;
    exclude?: User[] | null;
    note?: string;
}

export const Entry: React.FC<Props> = (props) => {
    const [item, setItem] = useState("");
    const [cost, setCost] = useState<number>();
    // const [excludedUsers, setExcludedUsers] = useState<User[]>([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        if (props.item && props.cost && props.note !== undefined) {
            setItem(props.item);
            setCost(props.cost);
            setNote(props.note);
        }
    }, [props.item, props.cost, props.note]);

    return (
        <Grid className={props.id % 2 ? "entry oddId" : "entry evenId"} container spacing={0}>
            <Grid className="entryItemContainer" item xs={2}>
                <Input 
                    className="entryItem" 
                    disableUnderline={true} 
                    fullWidth={true} 
                    value={item} 
                    onChange={(e) => setItem(e.target.value)} 
                />
            </Grid>
            <Grid className="entryItemContainer" item xs={1}>
                <Input 
                    className="entryItem" 
                    disableUnderline={true} 
                    fullWidth={true} 
                    value={cost} 
                    onChange={(e) => setCost(Number(e.target.value))} 
                />
            </Grid>
            <Grid className="entryItemContainer" item xs={2}>

            </Grid>
            <Grid className="entryItemContainer" item xs={4}>
                <Input 
                    className="entryItem" 
                    disableUnderline={true} 
                    fullWidth={true} 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                />
            </Grid>
        </Grid>
    );
}