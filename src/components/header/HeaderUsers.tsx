import * as React from "react";
import { AddUser } from "./AddUser";
import { HeaderUser } from "./HeaderUser";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

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
