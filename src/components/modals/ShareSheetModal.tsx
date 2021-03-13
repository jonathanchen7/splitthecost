import * as React from "react";
import { Button, Dialog, DialogContent, Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
// import NumberFormat from "react-number-format";
import { SheetContext } from "../pages/SplitTheCost";
import { useHistory } from "react-router-dom";
import { ModalHeader } from "./ModalHeader";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShareSheetModal: React.FC<Props> = ({ open, setOpen }) => {
  const history = useHistory();

  const { sheetState, sheetDispatch } = useContext(SheetContext);

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setButtonText(sheetState.local ? "GENERATE" : "COPY");
  }, [sheetState.local]);

  function handleClose() {
    setOpen(false);
  }

  function confirmSaveSheet() {
    sheetDispatch({ type: "saveSheet" });
    history.push(`/sheet/${sheetState.id}`);
  }

  function copySheetLink() {
    navigator.clipboard.writeText(`splitthecost.net/#/sheet/${sheetState.id}`);
    setButtonText("COPIED");
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      PaperProps={{ className: "modal" }}
    >
      <ModalHeader title='Share Sheet' onClose={handleClose} />
      <DialogContent className='modalContent bottomMargin'>
        <Grid container spacing={0} alignItems='center'>
          <Grid item xs={8}>
            {sheetState.local ? (
              "Generate link to share with friends?"
            ) : (
              <>
                splitthecost.com/sheet/
                <b>
                  {sheetState.customLink
                    ? sheetState.customLink
                    : sheetState.id}
                </b>
              </>
            )}
          </Grid>
          <Grid item xs={1} />
          <Grid container item xs={3} justify='flex-end'>
            <Button
              fullWidth={sheetState.local}
              onClick={sheetState.local ? confirmSaveSheet : copySheetLink}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
