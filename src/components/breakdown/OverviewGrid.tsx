import { Grid } from "@material-ui/core";
import * as React from "react";
import { Entry, User } from "../../models/models";
import { OverviewHeader } from "./OverviewHeader";
import { OverviewRow } from "./OverviewRow";

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
}

export const OverviewGrid: React.FC<Props> = ({ users, curUser, entries }) => {
  return (
    <div className='overview'>
      <OverviewHeader />
      {users.map((user) => (
        <OverviewRow user={user} users={users} entries={entries} />
      ))}
      <Grid
        container
        spacing={0}
        className={users.length % 2 ? "evenIdx" : "oddIdx"}
      ></Grid>
    </div>
  );
};
