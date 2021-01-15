import * as React from "react";
import { Avatar, Chip, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { getAvatarColor } from "../../actions/actions";

interface Props {
  user: User;
  hideTooltip?: boolean;
  onRemove?: (user: User) => void;
  className?: string;
}

export const UserChip: React.FC<Props> = ({
  user,
  hideTooltip,
  onRemove,
  className,
}) => {
  function renderChip(user: User) {
    return (
      <Chip
        className={`chip leftMarginSmall ${className}`}
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
    );
  }

  return hideTooltip ? (
    renderChip(user)
  ) : (
    <Tooltip
      className={className}
      arrow
      title={user.email}
      placement='top'
      key={user.id}
    >
      {renderChip(user)}
    </Tooltip>
  );
};
