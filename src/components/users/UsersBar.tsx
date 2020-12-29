import { Grid } from "@material-ui/core";
import * as React from "react";
import { User } from "../../models/models";
import { AddUser } from "./AddUser";
import { UserAvatar } from "./UserAvatar";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const UsersBar: React.FC<Props> = ({ users, setUsers }) => {
  return (
    <Grid className='usersBar' container spacing={0}>
      <Grid className='usersBarItem' item xs={12}>
        {users.map((user) => (
          <UserAvatar
            user={user}
            users={users}
            setUsers={setUsers}
            key={user.email}
          />
        ))}
        <AddUser users={users} setUsers={setUsers} />
      </Grid>
    </Grid>
  );
};
