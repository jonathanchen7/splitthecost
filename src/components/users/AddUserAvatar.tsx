import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { User } from "../../models/models";

interface Props {
  users: User[];
}

export const AddUserAvatar: React.FC<Props> = ({ users }) => {
  return (
    <span>
      <Tooltip arrow title='Add User' placement='right'>
        <Avatar className='userCircle'>
          <AddIcon />
        </Avatar>
      </Tooltip>
    </span>
  );
};
