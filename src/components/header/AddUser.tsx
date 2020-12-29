import * as React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { User } from "../../models/models";

interface Props {
  users: User[];
}
export const AddUser: React.FC<Props> = ({ users }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span onClick={handleOpen}>
      <Tooltip arrow title='Add User' placement='right'>
        <Avatar className='userCircle'>
          <AddIcon />
        </Avatar>
      </Tooltip>
    </span>
  );
};
