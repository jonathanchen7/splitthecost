import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar, Tooltip } from "@material-ui/core";
import { useState } from "react";
import { User } from "../../models/models";

interface Props {
  user: User;
  users: User[];
}

const colors = [
  "#1abc9c",
  "#f1c40f",
  "#f39c12",
  "#c0392b",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
];

function hashUser(email: string): number {
  var h = 0,
    l = email.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + email.charCodeAt(i++)) | 0;
  return Math.abs(h % colors.length);
}

export const HeaderUser: React.FC<Props> = ({ user, users }) => {
  function deleteUser() {
    console.log(`Deleting ${user.firstName} ${user.lastName}`);
    users.splice(users.indexOf(user));
    console.log(users.length);
  }

  const [showDelete, setShowDelete] = useState(false);

  const firstInitial = user.firstName.charAt(0).toLocaleUpperCase();
  const secondInitial = user.lastName.charAt(0).toLocaleUpperCase();
  const color = colors[hashUser(user.email)];

  return (
    <span
      onClick={deleteUser}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <Tooltip
        arrow
        title={`${user.firstName} ${user.lastName}`}
        placement='top'
      >
        <Avatar className='userCircle' style={{ backgroundColor: color }}>
          {showDelete ? <DeleteIcon /> : `${firstInitial}${secondInitial}`}
        </Avatar>
      </Tooltip>
    </span>
  );
};
