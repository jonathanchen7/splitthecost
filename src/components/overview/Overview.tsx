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
}

export const Overview: React.FC<Props> = ({ users, curUser, entries }) => {
  const [overviewData, setOverviewData] = useState<OverviewData>({});

  useEffect(() => {
    setOverviewData(calculateOverview(entries, users));
  }, [users, entries]);

  return (
    <div className='overview'>
      <OverviewHeader />
      {users.map((user) => (
        <OverviewRow
          user={user}
          users={users}
          data={overviewData[user.id]}
          key={user.id}
        />
      ))}
    </div>
  );
};
