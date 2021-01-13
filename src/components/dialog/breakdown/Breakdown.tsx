import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User, UserBreakdownData } from "../../../models/models";
import { calculateUserBreakdown } from "../../../actions/actions";
import { BreakdownHeader } from "./BreakdownHeader";
import { BreakdownRow } from "./BreakdownRow";

interface Props {
  users: { [id: string]: User };
  curUser: User;
  entries: Entry[];
}

export const Breakdown: React.FC<Props> = ({ users, curUser, entries }) => {
  const [breakdownData, setBreakdownData] = useState<UserBreakdownData>();

  useEffect(() => {
    setBreakdownData(calculateUserBreakdown(curUser, entries, users));
  }, [curUser, users, entries]);

  return Object.keys(users).length <= 1 ? (
    <div className='noBreakdownData'>No data to break down! :)</div>
  ) : (
    <>
      <BreakdownHeader />
      {Object.entries(users).map((pair, idx) => {
        let user = pair[1];
        return (
          user !== curUser && (
            <BreakdownRow
              user={user}
              curUser={curUser}
              users={users}
              data={breakdownData?.userBreakdown[user.id]}
              idx={idx}
              key={user.id}
            />
          )
        );
      })}
    </>
  );
};
