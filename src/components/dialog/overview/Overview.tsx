import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { OverviewData } from "../../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { calculateOverview } from "../../../actions/sheetActions";
import { SheetContext } from "../../SplitTheCost";
import { UserContext } from "../../../App";

export const Overview: React.FC = () => {
  const { sheetData } = useContext(SheetContext);
  const { appUserData } = useContext(UserContext);

  const [overviewData, setOverviewData] = useState<OverviewData>({});
  let rowIdx = 0;

  useEffect(() => {
    setOverviewData(calculateOverview(sheetData.entries, sheetData.users));
  }, [sheetData]);

  return (
    <>
      <OverviewHeader />
      {!!appUserData.curUser && (
        <OverviewRow
          user={appUserData.curUser}
          data={overviewData[appUserData.curUser.id]}
          idx={rowIdx++}
        />
      )}
      {Object.entries(sheetData.users).map((pair) => {
        let user = pair[1];
        return (
          user.id !== appUserData.curUser?.id && (
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
