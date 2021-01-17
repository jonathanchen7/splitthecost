import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className='homePage'>
      <span className='welcomeHeader'>welcome to SplitTheCost.</span>

      <Link className='noTextDecoration' to='/create'>
        <Button className='createNewButton'>create new sheet</Button>
      </Link>
    </div>
  );
};
