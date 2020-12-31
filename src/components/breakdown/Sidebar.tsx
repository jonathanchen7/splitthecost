import { Grid } from "@material-ui/core";
import * as React from "react";
import { Entry, User } from "../../models/models";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarRow } from "./SidebarRow";

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
}

export const Sidebar: React.FC<Props> = ({ users, curUser, entries }) => {
  return (
    <div className='sidebar'>
      <SidebarHeader />
      {users.map((user) => (
        <SidebarRow user={user} users={users} entries={entries} />
      ))}
      <Grid
        container
        spacing={0}
        className={users.length % 2 ? "evenIdx" : "oddIdx"}
      ></Grid>
    </div>
  );
};
