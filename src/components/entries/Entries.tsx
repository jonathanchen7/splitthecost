import * as React from "react";
import { useState } from "react";
import { Entry } from "./Entry";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { EntriesHeader } from "./EntriesHeader";
import { User } from "../header/HeaderUsers";

export interface EntryItem {
  id: number;
  item: string;
  cost: string;
  exclude: User[] | null;
  note: string;
}

export const Entries: React.FC = () => {
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
      cost: "0",
      exclude: null,
      note: "",
    };
    setEntries(entries.concat(newItem));
  }

  return (
    <div>
      <EntriesHeader />
      {entries.map((entry) => (
        <Entry entry={entry} key={entry.id} />
      ))}
      <Grid container spacing={0}>
        <Grid className='addItemContainer' item xs={2}>
          <Button
            className='addItemButton'
            variant='contained'
            color='default'
            startIcon={<AddIcon />}
            onClick={addItem}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
