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

  return !appUserData.curUser ||
    !breakdownData ||
    Object.keys(sheetData.users).length < 2 ? (
    <div className='noBreakdownData'>No data to break down. &#129396;</div>
  ) : (
    <>
      <BreakdownHeader />
      {Object.entries(sheetData.users).map((pair, idx) => {
        let user = pair[1];
        return (
          user.id !== appUserData.curUser!.id && (
            <BreakdownRow
              user={user}
              data={breakdownData.userBreakdown[user.id]}
              idx={idx}
              key={user.id}
            />
          )
        );
      })}
    </>
  );
};
