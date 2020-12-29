import * as React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";

interface Props {}

export const HeaderProfile: React.FC<Props> = (props) => {
  return (
    <Avatar className='userCircle profileCircle'>
      <AccountCircleIcon />
    </Avatar>
  );
};
