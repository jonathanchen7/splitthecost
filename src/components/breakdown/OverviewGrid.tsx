import { Grid } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User } from "../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";

interface BreakdownData {
  [userId: string]: { totalSpent: number; totalOwed: number };
}

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
  open: boolean;
}

export const OverviewGrid: React.FC<Props> = ({
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
        (user) => !entry.exclude?.includes(user)
      );
      const userCost = entry.cost / includedUsers.length;

      includedUsers.forEach((user) => {
        tempData[user.id].totalOwed += userCost;
      });
    });

    setBreakdownData(tempData);
  }, [users, entries]);

  return open ? (
    <div className='overviewDiv'>
      <OverviewHeader />
      {users.map((user) => (
        <OverviewRow
          user={user}
          users={users}
          data={breakdownData[user.id]}
          key={user.id}
        />
      ))}
      <Grid
        container
        spacing={0}
        className={users.length % 2 ? "evenIdx" : "oddIdx"}
      ></Grid>
    </div>
  ) : null;
};
