import * as React from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.png";
import { User } from "../../models/models";
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const Header: React.FC<Props> = ({ users, setUsers }) => {
  return (
    <Grid className='header' container spacing={0}>
      <Grid className='headerItem' item xs={11}>
        <img className='logo' src={logo} alt='logo' />
      </Grid>
      <Grid className='headerItem profileItem' item xs={1}>
        <Avatar className='avatar profile'>
          <AccountCircleIcon />
        </Avatar>
      </Grid>
    </Grid>
  );
};
