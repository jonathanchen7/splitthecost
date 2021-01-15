import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { OverviewData } from "../../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";
import { calculateOverview } from "../../../actions/sheetActions";
import { SheetContext } from "../../SplitTheCost";

export const Overview: React.FC = () => {
  const { sheetData } = useContext(SheetContext);

  const [overviewData, setOverviewData] = useState<OverviewData>({});

  useEffect(() => {
    setOverviewData(calculateOverview(sheetData.entries, sheetData.users));
  }, [sheetData]);

  return (
    <>
      <OverviewHeader />
      {Object.entries(sheetData.users).map((pair, idx) => {
        let user = pair[1];
        return (
          <OverviewRow
            user={user}
            data={overviewData[user.id]}
            idx={idx}
            key={user.id}
          />
        );
      })}
    </>
  );
};
