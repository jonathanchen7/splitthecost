import * as React from "react";
import { Avatar, Chip, Grid } from "@material-ui/core";
import { User } from "../../models/models";
import { AddUser } from "./AddUser";
import { UserAvatar } from "./UserAvatar";
import { getAvatarColor } from "../users/UserAvatar";

interface Props {
  users: User[];
  curUser: User;
  setUsers: (users: User[]) => void;
}

export const UsersBar: React.FC<Props> = ({ users, curUser, setUsers }) => {
  function deleteUser(user: User) {
    setUsers(users.filter((cur) => user !== cur));
  }

  return (
    <Grid className='usersBar' container spacing={0}>
      <Grid className='usersBarItem' item xs={12}>
        {users.map((user) => (
          <span className='leftMargin'>
            <Chip
              avatar={
                <Avatar
                  className='usersBarAvatar'
                  style={{ backgroundColor: getAvatarColor(user) }}
                >
                  {user.initials}
                </Avatar>
              }
              label={`${user.firstName} ${user.lastName}`}
              onDelete={user === curUser ? undefined : () => deleteUser(user)}
            />
          </span>
        ))}
        <span className='leftMargin'>
          <AddUser users={users} setUsers={setUsers} />
        </span>
      </Grid>
    </Grid>
  );
};
