import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { UserBreakdownData } from "../../../models/models";
import { calculateUserBreakdown } from "../../../actions/sheetActions";
import { BreakdownHeader } from "./BreakdownHeader";
import { BreakdownRow } from "./BreakdownRow";
import { UserContext } from "../../../App";
import { SheetContext } from "../../SplitTheCost";

export const Breakdown: React.FC = () => {
  const { sheetData } = useContext(SheetContext);
  const { appUserData } = useContext(UserContext);

  const [breakdownData, setBreakdownData] = useState<UserBreakdownData>();
  let rowIdx = 0;

  useEffect(() => {
    if (!!appUserData.curUser) {
      setBreakdownData(
        calculateUserBreakdown(
          appUserData.curUser,
          sheetData.entries,
          sheetData.users
        )
      );
    }
  }, [appUserData.curUser, sheetData]);

  return !appUserData.curUser || !breakdownData || sheetData.numUsers < 2 ? (
    <div className='noBreakdownData'>No data to break down. &#129396;</div>
  ) : (
    <>
      <BreakdownHeader />
      {Object.entries(sheetData.users).map((pair) => {
        let user = pair[1];
        return (
          user.id !== appUserData.curUser!.id && (
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
