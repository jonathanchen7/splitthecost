import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { useContext } from "react";
import { SheetContext } from "../SplitTheCost";

export const Entries: React.FC = () => {
  const { sheetData } = useContext(SheetContext);

  return (
    <>
      <EntriesHeader />
      {sheetData.entries.map((entry) => (
        <EntriesRow entry={entry} key={entry.id} />
      ))}
    </>
  );
};
