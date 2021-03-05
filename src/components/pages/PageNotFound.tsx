import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  return (
    <div className='errorPage'>
      <span className='errorPageHeader'>
        <b>404</b> - this page doesn't exist.
      </span>

      <Link className='noTextDecoration' to='/'>
        <Button className='createNewButton'>home</Button>
      </Link>
    </div>
  );
};
