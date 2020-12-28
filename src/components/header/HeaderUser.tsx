import * as React from "react";
import { User } from "./HeaderUsers";

interface Props {
    user: User;
}

const colors = [
    "#1abc9c",
    "#f1c40f",
    "#f39c12",
    "#c0392b",
    "#2980b9",
    "#8e44ad",
    "#2c3e50"
]

function hashUser(email: string): number {
    var h = 0, l = email.length, i = 0;
    if ( l > 0 )
        while (i < l)
        h = (h << 5) - h + email.charCodeAt(i++) | 0;
    return Math.abs(h % (colors.length));
}

export const HeaderUser: React.FC<Props> = (props) => {
    const firstInitial = props.user.firstName.charAt(0).toLocaleUpperCase();
    const secondInitial = props.user.lastName.charAt(0).toLocaleUpperCase();
    const color = colors[hashUser(props.user.email)];
    return (
        <div className="userCircle" style={{backgroundColor: color}}>
            {firstInitial}
            {secondInitial}
        </div>
    );
}