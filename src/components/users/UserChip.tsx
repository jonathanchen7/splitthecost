import * as React from "react";
import { Avatar, Chip, Tooltip } from "@material-ui/core";
import { User } from "../../models/models";
import { useContext } from "react";
import { getAvatarColor } from "../../actions/actions";
import { SheetContext } from "../SplitTheCost";

interface Props {
  user: User;
  hideTooltip?: boolean;
  allowRemove?: boolean;
  className?: string;
}

export const UserChip: React.FC<Props> = ({
  user,
  hideTooltip,
  allowRemove,
  className,
}) => {
  const { sheetDispatch } = useContext(SheetContext);

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
        onDelete={
          allowRemove
            ? () => {
                sheetDispatch({
                  type: "removeUser",
                  userId: user.id,
                });
              }
            : undefined
        }
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
