import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { useState } from "react";

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
  iconOnHover?: JSX.Element;
  onClick?: () => void;
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

export const UserAvatar: React.FC<Props> = ({
  user,
  tooltipPlacement,
  iconOnHover,
  onClick,
}) => {
  const [showIcon, setShowIcon] = useState(false);

  function onHover() {
    if (!!iconOnHover) {
      setShowIcon(true);
    }
  }

  function onLeave() {
    if (!!iconOnHover) {
      setShowIcon(false);
    }
  }

  return (
    <span onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onClick}>
      <Tooltip
        arrow
        title={`${user.firstName} ${user.lastName}`}
        placement={tooltipPlacement}
      >
        <Avatar
          className='avatar'
          style={{ backgroundColor: getAvatarColor(user) }}
        >
          {showIcon ? iconOnHover : user.initials}
        </Avatar>
      </Tooltip>
    </span>
  );
};
