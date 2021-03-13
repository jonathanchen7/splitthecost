import { Button } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SheetNotFound: React.FC = () => {
  const location = useLocation<{ sheetId: string }>();

  return (
    <div className='errorPage'>
      <span className='errorPageHeader'>
        sorry, we couldn't find a sheet with id "
        <b>{location.state?.sheetId}</b>
        ".
      </span>

      <Link className='noTextDecoration' to='/create'>
        <Button className='createNewButton'>create new sheet</Button>
      </Link>
    </div>
  );
};
