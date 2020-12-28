import * as React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {
    
}

export const HeaderProfile: React.FC<Props> = (props) => {
    return (
        <div className="userCircle profileCircle">
            <AccountCircleIcon />
        </div>
    );
}