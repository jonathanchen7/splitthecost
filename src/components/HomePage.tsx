import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
  return (
    <>
      <h1>welcome to splitthecost.</h1>
      <Button color='primary'>
        <Link to='/new'>NEW</Link>
      </Button>
    </>
  );
};
