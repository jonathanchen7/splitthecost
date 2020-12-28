import * as React from "react";
import { User, HeaderUsers } from "./HeaderUsers";
import Grid from '@material-ui/core/Grid';
import { HeaderProfile } from "./HeaderProfile";
import logo from '../../assets/logo.png';

interface Props {

}

const user1: User = {
    firstName: "Jonathan",
    lastName: "Chen",
    email: "jonathanschen28@gmail.com"
}

const user2: User = {
    firstName: "Abigail",
    lastName: "Chen",
    email: "seedot28@hotmail.com"
}

const users = [user1, user2];

export const Header: React.FC<Props> = (props) => {
    return (
        <Grid className="header" container spacing={0}>
            <Grid className="headerLogo" item xs={2}>
                <img src={logo} alt="logo" height="40px" />
            </Grid>
            <Grid className="headerItem" item xs={7}>
                <HeaderUsers users={users} />
            </Grid>
            <Grid className="headerItem alignRight" item xs={3}>
                <HeaderProfile />
            </Grid>
        </Grid>
    );
}