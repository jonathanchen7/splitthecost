import * as React from "react";
import CloudDoneRoundedIcon from "@material-ui/icons/CloudDoneRounded";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import { SaveState } from "../../models/models";

interface Props {
  saveState: SaveState;
}

export const AutosaveMessage: React.FC<Props> = ({ saveState }) => {
  function renderMessage(): JSX.Element {
    if (saveState === SaveState.Unsaved) {
      return <></>;
    } else if (saveState === SaveState.Saving) {
      return (
        <>
          <SyncRoundedIcon fontSize='small' />
          <p className='leftMarginSmall'>Saving...</p>
        </>
      );
    } else {
      return (
        <>
          <CloudDoneRoundedIcon fontSize='small' />
          <p className='leftMarginSmall'>Saved to Cloud</p>
        </>
      );
    }
  }

  return <span id='autosaveMessage'>{renderMessage()}</span>;
};
