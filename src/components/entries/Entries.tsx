import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { useContext } from "react";
import { SheetContext } from "../SplitTheCost";
import { UserContext } from "../../App";

export const Entries: React.FC = () => {
  const { userState } = useContext(UserContext);
  const { sheetState } = useContext(SheetContext);

  return (
    <>
      <EntriesHeader />
      {sheetState.entries.map(
        (entry, idx) =>
          (entry.createdBy === userState.curUser?.id ||
            !!entry.item ||
            !!entry.cost ||
            !!entry.note) && (
            <EntriesRow
              entry={entry}
              curUserEntry={userState.curUser?.id === entry.createdBy}
              rowIdx={idx}
              key={entry.id}
            />
          )
      )}
    </>
  );
};
