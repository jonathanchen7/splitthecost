import * as React from "react";
import { Avatar, Chip } from "@material-ui/core";
import { User } from "../../models/models";
import { getAvatarColor } from "../../logic/logic";

interface Props {
  user: User;
  userIdx: number;
  onRemove?: (user: User) => void;
  onClick?: (user: User) => void;
  className?: string;
}

export const UserChip: React.FC<Props> = ({
  user,
  userIdx,
  onRemove,
  onClick,
  className,
}) => {
  return (
    <span onClick={onClick && (() => onClick(user))}>
      <Chip
        className={`chip ${className} ${onClick && "linkCursor"}`}
        avatar={
          <Avatar
            className='smallAvatar'
            style={{ backgroundColor: getAvatarColor(user, userIdx) }}
          >
            {user.initials}
          </Avatar>
        }
        label={user.displayName}
        onDelete={onRemove && (() => onRemove(user))}
        key={user.id}
      />
    </span>
  );
};
