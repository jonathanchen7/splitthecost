import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { useState } from "react";
import { getAvatarColor } from "../../actions/sheetActions";

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
  className?: string;
}

export const UserAvatar: React.FC<Props> = ({
  user,
  tooltipPlacement,
  iconOnHover,
  onClick,
  className,
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
    <span
      className={className}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Tooltip arrow title={user.displayName} placement={tooltipPlacement}>
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
