import * as React from "react";
import Grid from '@material-ui/core/Grid';
import { User } from "../header/HeaderUsers";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "@material-ui/core";

interface Props {
    id: number;
    item?: string;
    cost?: string;
    exclude?: User[] | null;
    note?: string;
}

function validCost(input: string): boolean {
    return input.charAt(input.length - 1) !== '.' || !isNaN(Number(input));
}

export const Entry: React.FC<Props> = (props) => {
    const [item, setItem] = useState("");
    const [cost, setCost] = useState("");
    // const [excludedUsers, setExcludedUsers] = useState<User[]>([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        if (props.item && props.cost && props.note !== undefined) {
            setItem(props.item);
            setCost(props.cost);
            setNote(props.note);
        }
    }, [props.item, props.cost, props.note]);

    function updateCost(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (validCost(e.target.value)) {
            setCost(e.target.value);
        }
    }

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
                    onChange={updateCost} 
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