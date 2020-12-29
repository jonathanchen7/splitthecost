import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "@material-ui/core";
import { EntryItem } from "./Entries";

interface Props {
  entry: EntryItem;
}

function validateCost(input: string): boolean {
  return input.charAt(input.length - 1) !== "." || !isNaN(Number(input));
}

export const Entry: React.FC<Props> = ({ entry }) => {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  // const [excludedUsers, setExcludedUsers] = useState<User[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (entry.item && entry.cost && entry.note !== undefined) {
      setItem(entry.item);
      setCost(entry.cost);
      setNote(entry.note);
    }
  }, [entry.item, entry.cost, entry.note]);

  function updateCost(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (validateCost(e.target.value)) {
      setCost(e.target.value);
    }
  }

  return (
    <Grid className='entry' container spacing={0}>
      <Grid
        className={
          entry.id % 2
            ? "entryItemContainer oddId"
            : "entryItemContainer evenId"
        }
        item
        xs={2}
      >
        <Input
          className='entryItem'
          disableUnderline={true}
          fullWidth={true}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </Grid>
      <Grid
        className={
          entry.id % 2
            ? "entryItemContainer oddId"
            : "entryItemContainer evenId"
        }
        item
        xs={1}
      >
        <Input
          className='entryItem'
          disableUnderline={true}
          fullWidth={true}
          value={cost}
          onChange={updateCost}
        />
      </Grid>
      <Grid
        className={
          entry.id % 2
            ? "entryItemContainer oddId"
            : "entryItemContainer evenId"
        }
        item
        xs={2}
      ></Grid>
      <Grid
        className={
          entry.id % 2
            ? "entryItemContainer oddId"
            : "entryItemContainer evenId"
        }
        item
        xs={4}
      >
        <Input
          className='entryItem'
          disableUnderline={true}
          fullWidth={true}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
