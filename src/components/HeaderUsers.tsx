import * as React from "react";
import { AddUser } from "./AddUser";
import { HeaderUser } from "./HeaderUser";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface Props {
    users: User[];
}

export const HeaderUsers: React.FC<Props> = (props) => {
    return (
        <div>
            {props.users.map(user => <HeaderUser user={user} />)}
            <AddUser />
        </div>
    );
}