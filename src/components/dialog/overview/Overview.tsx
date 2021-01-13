import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User, OverviewData } from "../../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { calculateOverview } from "../../../actions/actions";

interface Props {
  users: { [id: string]: User };
  entries: Entry[];
}

export const Overview: React.FC<Props> = ({ users, entries }) => {
  const [overviewData, setOverviewData] = useState<OverviewData>({});

  useEffect(() => {
    setOverviewData(calculateOverview(entries, users));
  }, [users, entries]);

  return (
    <>
      <OverviewHeader />
      {Object.entries(users).map((pair, idx) => {
        let user = pair[1];
        return (
          <OverviewRow
            user={user}
            users={users}
            data={overviewData[user.id]}
            idx={idx}
            key={user.id}
          />
        );
      })}
    </>
  );
};
