import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User, OverviewData } from "../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { AnimatePresence, motion } from "framer-motion";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import { Button } from "@material-ui/core";
import {
  calculateOverview,
  calculateUserBreakdown,
} from "../../actions/actions";

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
  const [overviewData, setOverviewData] = useState<OverviewData>({});

  useEffect(() => {
    setOverviewData(calculateOverview(entries, users));
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
              data={overviewData[user.id]}
              key={user.id}
            />
          ))}
          <Button
            className='breakdownButton'
            variant='contained'
            color='primary'
            startIcon={<ReceiptRoundedIcon />}
            onClick={() => calculateUserBreakdown(curUser, entries, users)}
          >
            <span className='buttonText'>Breakdown</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
