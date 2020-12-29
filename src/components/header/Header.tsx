import * as React from "react";
import { HeaderUsers } from "./HeaderUsers";
import Grid from "@material-ui/core/Grid";
import { HeaderProfile } from "./HeaderProfile";
import logo from "../../assets/logo.png";
import { User } from "../../models/models";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const Header: React.FC<Props> = ({ users, setUsers }) => {
  return (
    <div>
      <Grid className='header' container spacing={0}>
        <Grid className='headerLogoItem' item xs={11}>
          <img className='headerLogo' src={logo} alt='logo' height='40px' />
        </Grid>
        <Grid className='headerItem alignRight' item xs={1}>
          <HeaderProfile />
        </Grid>
      </Grid>
      <Grid className='headerUsersContainer' container spacing={0}>
        <Grid className='headerUsersItem' item xs={12}>
          <HeaderUsers users={users} />
        </Grid>
      </Grid>
    </div>
  );
};
