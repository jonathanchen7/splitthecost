import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { useContext } from "react";
import { SheetContext } from "../SplitTheCost";
import { UserContext } from "../../App";

export const Entries: React.FC = () => {
  const { appUserData } = useContext(UserContext);
  const { sheetData } = useContext(SheetContext);

  return (
    <>
      <EntriesHeader />
      {sheetData.entries.map((entry, idx) => (
        <EntriesRow
          entry={entry}
          curUserEntry={appUserData.curUser?.id === entry.createdBy}
          rowIdx={idx}
          key={entry.id}
        />
      ))}
    </>
  );
};
