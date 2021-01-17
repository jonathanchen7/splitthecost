import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { OverviewData } from "../../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { calculateOverview } from "../../../actions/sheetActions";
import { SheetContext } from "../../SplitTheCost";
import { UserContext } from "../../../App";

export const Overview: React.FC = () => {
  const { sheetState } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  const [overviewData, setOverviewData] = useState<OverviewData>({});
  let rowIdx = 0;

  useEffect(() => {
    setOverviewData(calculateOverview(sheetState.entries, sheetState.users));
  }, [sheetState]);

  return (
    <>
      <OverviewHeader />
      {!!userState.curUser && (
        <OverviewRow
          user={userState.curUser}
          data={overviewData[userState.curUser.id]}
          idx={rowIdx++}
        />
      )}
      {Object.entries(sheetState.users).map((pair) => {
        let user = pair[1];
        return (
          user.id !== userState.curUser?.id && (
            <OverviewRow
              user={user}
              data={overviewData[user.id]}
              idx={rowIdx++}
              key={user.id}
            />
          )
        );
      })}
    </>
  );
};
