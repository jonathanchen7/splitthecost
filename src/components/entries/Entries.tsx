import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { useContext } from "react";
import { SheetContext } from "../SplitTheCost";
import { UserContext } from "../../App";

export const Entries: React.FC = () => {
  const { curUser } = useContext(UserContext);
  const { sheetData } = useContext(SheetContext);

  return (
    <>
      <EntriesHeader />
      {sheetData.entries.map((entry) => (
        <EntriesRow
          entry={entry}
          curUserEntry={curUser?.id === entry.createdBy}
          key={entry.id}
        />
      ))}
    </>
  );
};
