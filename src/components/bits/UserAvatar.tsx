import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { getAvatarColor } from "../../logic/logic";

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
  disabled?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<Props> = ({
  user,
  userIdx,
  tooltipPlacement,
  disabled,
  className,
}) => {
  return (
    <Tooltip
      className={className}
      arrow
      title={user.displayName}
      placement={tooltipPlacement}
    >
      <Avatar
        className='avatar'
        style={{
          backgroundColor: getAvatarColor(user, userIdx, disabled),
        }}
      >
        {user.initials}
      </Avatar>
    </Tooltip>
  );
};
