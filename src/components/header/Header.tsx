import * as React from "react";
import { HeaderUsers } from "./HeaderUsers";
import Grid from "@material-ui/core/Grid";
import { HeaderProfile } from "./HeaderProfile";
import logo from "../../assets/logo.png";
import { User } from "../../models/models";

interface Props {}

const user1: User = {
  firstName: "Jonathan",
  lastName: "Chen",
  email: "jonathanschen28@gmail.com",
};

const user2: User = {
  firstName: "Abigail",
  lastName: "Chen",
  email: "abigail.chen@live.com",
};

const user3: User = {
  firstName: "Christine",
  lastName: "Liu",
  email: "thechens28@gmail.com",
};

const user4: User = {
  firstName: "Hongbo",
  lastName: "Chen",
  email: "bradchen28@gmail.com",
};

const users = [user1, user2, user3, user4];

export const Header: React.FC<Props> = (props) => {
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
