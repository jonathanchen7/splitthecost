import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { useContext } from "react";
import { SheetContext } from "../pages/SplitTheCost";
import { UserContext } from "../../App";

export const Entries: React.FC = () => {
  const { userState } = useContext(UserContext);
  const { sheetState } = useContext(SheetContext);
  let rowIdx = 0;

  return (
    <div className='entries'>
      <EntriesHeader />
      {userState.authenticated &&
        sheetState.entries.map(
          (entry) =>
            (entry.user === userState.curUser?.id ||
              entry.createdBy === userState.curUser?.id ||
              entry.item ||
              entry.cost ||
              entry.note) && (
              <EntriesRow entry={entry} rowIdx={rowIdx++} key={entry.id} />
            )
        )}
    </div>
  );
};
