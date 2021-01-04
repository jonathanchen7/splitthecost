import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User, OverviewData } from "../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { AnimatePresence, motion } from "framer-motion";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import { Button } from "@material-ui/core";
import { calculateOverview } from "../../actions/actions";

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
  open: boolean;
  setToggleOverview: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleBreakdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Overview: React.FC<Props> = ({
  users,
  curUser,
  entries,
  open,
  setToggleOverview,
  setToggleBreakdown,
}) => {
  const [overviewData, setOverviewData] = useState<OverviewData>({});

  useEffect(() => {
    setOverviewData(calculateOverview(entries, users));
  }, [users, entries]);

  function toggleBreakdown() {
    setToggleBreakdown(true);
    setToggleOverview(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='overview'
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 600, opacity: 0 }}
          exit={{ x: 600, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Overview</h1>
          <OverviewHeader />
          {users.map((user) => (
            <OverviewRow
              user={user}
              users={users}
              data={overviewData[user.id]}
              key={user.id}
            />
          ))}
          <Button
            className='sideDialogButton'
            variant='contained'
            color='primary'
            startIcon={<ReceiptRoundedIcon />}
            onClick={toggleBreakdown}
          >
            <span className='buttonText'>Breakdown</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
