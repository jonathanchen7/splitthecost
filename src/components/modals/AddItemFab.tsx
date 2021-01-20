import * as React from "react";
import { Fab } from "@material-ui/core";
import { useContext } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { UserContext } from "../../App";
import { SheetContext } from "../pages/SplitTheCost";

export const AddEntryModal: React.FC = () => {
  const { sheetDispatch } = useContext(SheetContext);
  const { userState } = useContext(UserContext);

  function addEntry() {
    sheetDispatch({
      type: "addEntry",
      createdBy: userState.curUser!.id,
      item: "",
      cost: 0,
      exclude: [],
      note: "",
    });
  }

  return (
    <div className='addItemFabDiv'>
      <Fab
        className='addItemFab'
        variant='extended'
        size='medium'
        onClick={addEntry}
      >
        <AddRoundedIcon />
        <span className='leftMarginSmall'>Add Item</span>
      </Fab>
    </div>
  );
};
