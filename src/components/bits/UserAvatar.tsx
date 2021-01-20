import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
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
  disabled?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<Props> = ({
  user,
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
          backgroundColor: getAvatarColor(user, disabled),
        }}
      >
        {user.initials}
      </Avatar>
    </Tooltip>
  );
};
