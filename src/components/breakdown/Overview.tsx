import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User } from "../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { AnimatePresence, motion } from "framer-motion";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import { Button } from "@material-ui/core";

interface BreakdownData {
  [userId: string]: { totalSpent: number; totalOwed: number };
}

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
  open: boolean;
}

export const Overview: React.FC<Props> = ({
  users,
  curUser,
  entries,
  open,
}) => {
  const [breakdownData, setBreakdownData] = useState<BreakdownData>({});

  useEffect(() => {
    let tempData: BreakdownData = {};

    // Create entries for each user.
    users.forEach((user) => {
      tempData[user.id] = { totalSpent: 0, totalOwed: 0 };
    });

    entries.forEach((entry) => {
      tempData[entry.createdBy.id].totalSpent += entry.cost;

      const includedUsers = users.filter(
        (user) => !entry.exclude.includes(user)
      );
      const userCost = entry.cost / includedUsers.length;

      includedUsers.forEach((user) => {
        tempData[user.id].totalOwed += userCost;
      });
    });

    setBreakdownData(tempData);
  }, [users, entries]);

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
          <OverviewHeader />
          {users.map((user) => (
            <OverviewRow
              user={user}
              users={users}
              data={breakdownData[user.id]}
              key={user.id}
            />
          ))}
          <Button
            className='breakdownButton'
            variant='contained'
            color='primary'
            startIcon={<ReceiptRoundedIcon />}
          >
            <span className='buttonText'>Breakdown</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
