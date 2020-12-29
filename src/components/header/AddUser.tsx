import * as React from "react";
import { Avatar, Backdrop, Button, Fade, Modal, Tooltip, withStyles, Zoom } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { User } from "./HeaderUsers";
import { useState } from "react";

interface Props {
    users: User[];
}
export const AddUser: React.FC<Props> = ({users}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <span onClick={handleOpen}>
            <Tooltip arrow title="Add User" placement="right">
                <Avatar className="userCircle">
                    <AddIcon />
                </Avatar>
            </Tooltip>
            
            <div>
                <Modal
                    className="addUserModal"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className="paper">
                            <h2>Add User</h2>
                        </div>
                    </Fade>
                </Modal>
                </div>
        </span>
    );
}