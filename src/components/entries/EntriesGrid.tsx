import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";
import { v4 as uuidv4 } from "uuid";

interface Props {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  curUser: User;
}

export const EntriesGrid: React.FC<Props> = ({
  entries,
  setEntries,
  curUser,
}) => {
  useEffect(() => {
    addItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addItem() {
    const newItem: Entry = {
      id: uuidv4(),
      item: "",
      cost: 0,
      exclude: null,
      note: "",
      createdBy: curUser,
    };
    setEntries((entries) => [...entries, newItem]);
    curUser.entries.push(newItem.id);
  }

  return (
    <div className='entryGridDiv'>
      <EntriesHeader />
      {entries.map((entry) => (
        <EntriesRow
          entry={entry}
          entries={entries}
          setEntries={setEntries}
          curUser={curUser}
          key={entry.id}
        />
      ))}

      <Grid container spacing={0}>
        <Grid className='addItemContainer' item xs={12}>
          <Button
            className='addItemButton'
            variant='contained'
            color='primary'
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
