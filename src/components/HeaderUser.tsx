import * as React from "react";
import { User } from "./HeaderUsers";

interface Props {
    user: User;
}

export const HeaderUser: React.FC<Props> = (props) => {
    const firstInitial = props.user.firstName.charAt(0).toLocaleUpperCase();
    const secondInitial = props.user.lastName.charAt(0).toLocaleUpperCase();
    return (
        <div className="userCircle">
            {firstInitial}
            {secondInitial}
        </div>
    );
}