import * as React from "react";
import { DialogTitle, IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

interface Props {
  title: string;
  onClose?: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title, onClose }) => {
  return (
    <DialogTitle className='modalTitle'>
      {title}
      {onClose && (
        <IconButton className='modalClose' size='small' onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};
