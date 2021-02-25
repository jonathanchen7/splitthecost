import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { getAvatarColor } from "../../logic/logic";
import { useState } from "react";

interface Props {
  user: User;
  userIdx: number;
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
  onClick?: () => void;
  iconOnHover?: JSX.Element;
  disabled?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<Props> = ({
  user,
  userIdx,
  tooltipPlacement,
  onClick,
  iconOnHover,
  disabled,
  className,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Tooltip
      className={className}
      arrow
      title={user.displayName}
      placement={tooltipPlacement}
      onClick={onClick}
    >
      <Avatar
        className='avatar'
        style={{
          backgroundColor: getAvatarColor(user, userIdx, disabled),
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? (iconOnHover ? iconOnHover : user.initials) : user.initials}
        </span>
      </Avatar>
    </Tooltip>
  );
};
