import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { UserBreakdownData } from "../../../models/models";
import { calculateUserBreakdown } from "../../../actions/actions";
import { BreakdownHeader } from "./BreakdownHeader";
import { BreakdownRow } from "./BreakdownRow";
import { UserContext } from "../../../App";
import { SheetContext } from "../../SplitTheCost";

export const Breakdown: React.FC = () => {
  const { sheetData } = useContext(SheetContext);
  const { curUser } = useContext(UserContext);

  const [breakdownData, setBreakdownData] = useState<UserBreakdownData>();

  useEffect(() => {
    setBreakdownData(
      calculateUserBreakdown(curUser, sheetData.entries, sheetData.users)
    );
  }, [curUser, sheetData]);

  return Object.keys(sheetData.users).length <= 1 ? (
    <div className='noBreakdownData'>No data to break down! :)</div>
  ) : (
    <>
      <BreakdownHeader />
      {Object.entries(sheetData.users).map((pair, idx) => {
        let user = pair[1];
        return (
          user !== curUser && (
            <BreakdownRow
              user={user}
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
