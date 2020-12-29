import * as React from "react";
import { useState } from "react";
import { EntryRow } from "./EntryRow";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";

interface Props {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
}

export const EntryGrid: React.FC<Props> = ({ entries, setEntries }) => {
  const [curId, setcurId] = useState(0);

  useEffect(() => {
    addItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addItem() {
    setcurId(curId + 1);
    const newItem: Entry = {
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
        <EntryRow entry={entry} key={entry.id} />
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
