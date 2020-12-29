import { Grid } from "@material-ui/core";
import * as React from "react";
import { User } from "../../models/models";
import { AddUserAvatar } from "./AddUserAvatar";
import { UserAvatar } from "./UserAvatar";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const UsersBar: React.FC<Props> = ({ users, setUsers }) => {
  return (
    <Grid className='headerUsersContainer' container spacing={0}>
      <Grid className='headerUsersItem' item xs={12}>
        <div className='headerUsers'>
          {users.map((user) => (
            <UserAvatar
              user={user}
              users={users}
              setUsers={setUsers}
              key={user.email}
            />
          ))}
          <AddUserAvatar users={users} setUsers={setUsers} />
        </div>
      </Grid>
    </Grid>
  );
};
