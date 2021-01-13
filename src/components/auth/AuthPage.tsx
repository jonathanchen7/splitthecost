import { Paper } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";

export const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  function switchView() {
    setShowLogin(!showLogin);
  }

  return (
    <div className='auth'>
      <Paper className='authPaper' elevation={7}>
        {showLogin ? (
          <Login switchView={switchView} />
        ) : (
          <SignUp switchView={switchView} />
        )}
      </Paper>
    </div>
  );
};
