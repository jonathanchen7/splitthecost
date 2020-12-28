import * as React from "react";
import { useState } from "react";
import { Entry, EntryItem } from "./Entry";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { EntriesHeader } from "./EntriesHeader";

interface Props {

}

export const Entries: React.FC<Props> = (props) => {
    const [curId, setcurId] = useState(0);
    const [entries, setEntries] = useState<EntryItem[]>([]);

    useEffect(() => {
        addItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function addItem() {
        setcurId(curId + 1);
        const newItem: EntryItem = {
            id: curId,
            item: "",
            cost: 0,
            exclude: null,
            note: ""
        }
        setEntries(entries.concat(newItem));
    }

    return (
        <div>
            <EntriesHeader />
            {entries.map(entry => <Entry id={entry.id} item={entry.item} cost={entry.cost} note={entry.note} /> )}
            <Grid className="entryItemContainer" container spacing={0}>
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
            </Grid>
            
        </div>
    );
}