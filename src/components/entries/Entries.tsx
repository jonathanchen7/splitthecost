import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";
import { useContext } from "react";
import { UserContext } from "../../App";

interface Props {
  entries: Entry[];
  users: { [id: string]: User };
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export const Entries: React.FC<Props> = ({ entries, users, setEntries }) => {
  const { curUser } = useContext(UserContext);

  return (
    <>
      <EntriesHeader />
      {entries.map((entry) => (
        <EntriesRow
          entry={entry}
          entries={entries}
          users={users}
          setEntries={setEntries}
          key={entry.id}
        />
      ))}
    </>
  );
};
