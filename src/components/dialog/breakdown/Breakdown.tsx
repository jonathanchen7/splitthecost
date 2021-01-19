import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { UserBreakdownData } from "../../../models/models";
import { calculateUserBreakdown } from "../../../actions/sheetActions";
import { BreakdownHeader } from "./BreakdownHeader";
import { BreakdownRow } from "./BreakdownRow";
import { UserContext } from "../../../App";
import { SheetContext } from "../../SplitTheCost";

export const Breakdown: React.FC = () => {
  const { sheetState } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  const [breakdownData, setBreakdownData] = useState<UserBreakdownData>();
  let rowIdx = 0;

  useEffect(() => {
    if (userState.curUser) {
      setBreakdownData(
        calculateUserBreakdown(
          userState.curUser,
          sheetState.entries,
          sheetState.users
        )
      );
    }
  }, [userState.curUser, sheetState]);

  return !userState.curUser || !breakdownData || sheetState.numUsers < 2 ? (
    <div className='noBreakdownData'>No data to break down. &#129396;</div>
  ) : (
    <>
      <BreakdownHeader />
      {Object.entries(sheetState.users).map((pair) => {
        let user = pair[1];
        return (
          user.id !== userState.curUser!.id && (
            <BreakdownRow
              user={user}
              data={breakdownData.userBreakdown[user.id]}
              idx={rowIdx++}
              key={user.id}
            />
          )
        );
      })}
    </>
  );
};
