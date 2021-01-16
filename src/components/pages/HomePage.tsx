import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className='homePage'>
      <span className='welcomeHeader'>welcome to splitthecost.</span>

      <Link className='noTextDecoration' to='/create'>
        <Button className='createNewButton'>Create New Sheet</Button>
      </Link>
    </div>
  );
};
