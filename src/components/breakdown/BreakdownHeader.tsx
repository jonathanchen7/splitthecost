import { Grid } from "@material-ui/core";
import * as React from "react";
import { UserBreakdownData } from "../../models/models";

interface Props {
  breakdownData: UserBreakdownData | undefined;
}

export const BreakdownHeader: React.FC<Props> = ({ breakdownData }) => {
  return (
    <Grid className='breakdownHeader' container spacing={0}>
      <Grid item xs={6}>
        <span className='gridHeaderText'>
          YOU SPENT: ${breakdownData?.totalSpent.toFixed(2)}
        </span>
      </Grid>
      <Grid item xs={6}>
        <span className='gridHeaderText'>
          YOU OWE: ${breakdownData?.totalOwed.toFixed(2)}
        </span>
      </Grid>
    </Grid>
  );
};
