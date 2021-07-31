import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import homepage from "../../assets/homepage.png";
import blob from "../../assets/blob.svg";
import { ViewOnDesktop } from "./ViewOnDesktop";

export const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 1000;

  if (isMobile) {
    return <ViewOnDesktop />;
  } else {
    return (
      <>
        <Grid className='homepage' container spacing={0} alignContent='center'>
          <Grid item container xs={8} justify='center'>
            <img id='homepageBlob' src={blob} alt='blob' />
            <img id='homepageImg' src={homepage} alt='homepage' />
          </Grid>
          <Grid item container xs={4} alignItems='center' alignContent='center'>
            <div id='homepageText'>
              <span id='homepageTitle'>welcome to splitthecost.</span>
              <span id='homepageSubtitle'>
                shared expenses for trips/events made simple. no sign up
                required!
              </span>
              <Link className='noTextDecoration' to='/create'>
                <Button className='createNewButton'>create new sheet</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
};
