import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import fire from "../../firebase";

export interface Props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthPage: React.FC<Props> = ({ setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [validLogin, setValidLogin] = useState(true);

  useEffect(() => {
    authListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }

  function switchView() {
    setEmail("");
    setValidEmail(true);
    setPassword("");
    setValidPassword(true);
    setShowLogin(!showLogin);
  }

  function handleLogin() {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.code);
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setValidLogin(false);
            break;
        }
      });
    setValidLogin(true);
  }

  function handleSignUp() {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.code);
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setValidEmail(false);
            break;
          case "auth/weak-password":
            setValidPassword(false);
            break;
        }
      });
    setValidEmail(true);
    setValidPassword(true);
  }

  return (
    <div className='auth'>
      <Paper className='authPaper' elevation={7}>
        {showLogin ? (
          <Login
            switchView={switchView}
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            validLogin={validLogin}
          />
        ) : (
          <SignUp
            switchView={switchView}
            handleSignUp={handleSignUp}
            email={email}
            setEmail={setEmail}
            validEmail={validEmail}
            password={password}
            setPassword={setPassword}
            validPassword={validPassword}
          />
        )}
      </Paper>
    </div>
  );
};
