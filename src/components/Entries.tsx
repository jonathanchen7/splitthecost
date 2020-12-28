import * as React from "react";
import { useState } from "react";
import { Entry, EntryItem } from "./Entry";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from "@material-ui/core";

interface Props {

}

const test1: EntryItem = {
    id: 1,
    item: "Hydroflask",
    cost: 35.49,
    exclude: null,
    note: ""
}

const test2: EntryItem = {
    id: 2,
    item: "Puzzle",
    cost: 23.34,
    exclude: null,
    note: "space needle puzzles"
}

const test3: EntryItem = {
    id: 1,
    item: "Yoga mat",
    cost: 8.99,
    exclude: null,
    note: "trainermat for abs"
}


export const Entries: React.FC<Props> = (props) => {
    const [curId, setcurId] = useState(0);
    const [entries, setEntries] = useState<EntryItem[]>([]);
    entries.push(test1);
    entries.push(test2);
    entries.push(test3);
    console.log(entries);

    function addItem() {
        
    }

    return (
        <div>
            {entries.map(entry => <Entry id={entry.id} item={entry.item} cost={entry.cost} note={entry.note} /> )}
            {/* <Grid className="entryItemContainer" container spacing={0}>
                <Grid item xs={2}>
                    <Button 
                    variant="contained" 
                    color="default" 
                    startIcon={<AddIcon />}
                    onClick={addItem}
                    >
                        Add Item
                    </Button>
                </Grid>
            </Grid> */}
            
        </div>
    );
}