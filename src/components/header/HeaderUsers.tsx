import * as React from "react";
import { User } from "../../models/models";
import { AddUser } from "./AddUser";
import { HeaderUser } from "./HeaderUser";

interface Props {
  users: User[];
}

export const HeaderUsers: React.FC<Props> = ({ users }) => {
  return (
    <div className='headerUsers'>
      {users.map((user) => (
        <HeaderUser user={user} users={users} key={user.email} />
      ))}
      <AddUser users={users} />
    </div>
  );
};
