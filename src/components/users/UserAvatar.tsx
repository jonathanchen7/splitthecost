import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";

interface Props {
  user: User;
  tooltipPlacement:
    | "top"
    | "left"
    | "right"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;
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

export function getAvatarColor(user: User): string {
  var h = 0,
    l = user.email.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + user.email.charCodeAt(i++)) | 0;
  return colors[Math.abs(h % colors.length)];
}

export const UserAvatar: React.FC<Props> = ({ user, tooltipPlacement }) => {
  return (
    <Tooltip
      arrow
      title={`${user.firstName} ${user.lastName}`}
      placement={tooltipPlacement}
    >
      <Avatar
        className='avatar'
        style={{ backgroundColor: getAvatarColor(user) }}
      >
        {user.initials}
      </Avatar>
    </Tooltip>
  );
};
