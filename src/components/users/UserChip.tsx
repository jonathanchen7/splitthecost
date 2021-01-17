import * as React from "react";
import { Avatar, Chip, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { getAvatarColor } from "../../actions/sheetActions";

interface Props {
  user: User;
  onRemove?: (user: User) => void;
  onClick?: (user: User) => void;
  className?: string;
}

export const UserChip: React.FC<Props> = ({
  user,
  onRemove,
  onClick,
  className,
}) => {
  return (
    <span onClick={!!onClick ? () => onClick(user) : undefined}>
      <Chip
        className={`chip leftMarginSmall ${className} ${
          !!onClick && "linkCursor"
        }`}
        avatar={
          <Avatar
            className='smallAvatar'
            style={{ backgroundColor: getAvatarColor(user) }}
          >
            {user.initials}
          </Avatar>
        }
        label={user.displayName}
        onDelete={!!onRemove ? () => onRemove(user) : undefined}
        key={user.id}
      />
    </span>
  );
};
