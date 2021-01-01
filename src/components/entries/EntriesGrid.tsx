import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";

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
    </div>
  );
};
