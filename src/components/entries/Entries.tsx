import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";

interface Props {
  entries: Entry[];
  users: User[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  curUser: User;
}

export const Entries: React.FC<Props> = ({
  entries,
  users,
  setEntries,
  curUser,
}) => {
  return (
    <div>
      <EntriesHeader />
      {entries.map((entry) => (
        <EntriesRow
          entry={entry}
          entries={entries}
          users={users}
          setEntries={setEntries}
          curUser={curUser}
          key={entry.id}
        />
      ))}
    </div>
  );
};
