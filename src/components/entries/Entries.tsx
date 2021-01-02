import * as React from "react";
import { EntriesRow } from "./EntriesRow";
import { EntriesHeader } from "./EntriesHeader";
import { Entry, User } from "../../models/models";
import { motion } from "framer-motion";

interface Props {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  curUser: User;
}

export const Entries: React.FC<Props> = ({ entries, setEntries, curUser }) => {
  return (
    <div className='entryGridDiv'>
      <EntriesHeader />
      {entries.map((entry) => (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -2000, opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <EntriesRow
            entry={entry}
            entries={entries}
            setEntries={setEntries}
            curUser={curUser}
            key={entry.id}
          />
        </motion.div>
      ))}
    </div>
  );
};
