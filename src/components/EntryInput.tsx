import * as React from "react";
import Grid from '@material-ui/core/Grid';
import { User } from "./HeaderUsers";
import { EntryText } from "./EntryText";
import { useState } from "react";
import { Input, TextField } from "@material-ui/core";

interface Props {
    id: number;
}

export const EntryInput: React.FC<Props> = (props) => {
    const [item, setItem] = useState("");
    const [cost, setCost] = useState<number>();
    const [excludedUsers, setExcludedUsers] = useState<User[]>([]);
    const [note, setNote] = useState("");

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
                {item}
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