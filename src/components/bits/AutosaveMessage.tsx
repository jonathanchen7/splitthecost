import * as React from "react";
import CloudDoneRoundedIcon from "@material-ui/icons/CloudDoneRounded";

export const AutosaveMessage: React.FC = () => {
  return (
    <span id='autosaveMessage'>
      <>
        <CloudDoneRoundedIcon fontSize='small' />
        <p className='leftMarginSmall'>Saved to Cloud</p>
      </>
    </span>
  );
};
