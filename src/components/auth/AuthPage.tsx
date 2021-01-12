import { Paper } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { auth, googleAuthProvider } from "../../firebase";

export const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [validLogin, setValidLogin] = useState(true);

  function switchView() {
    setEmail("");
    setValidEmail(true);
    setPassword("");
    setValidPassword(true);
    setShowLogin(!showLogin);
  }

  function handleLogin() {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      console.log(err);
      setValidLogin(false);
    });
    setValidLogin(true);
  }

  function googleSignIn() {
    auth.signInWithPopup(googleAuthProvider);
    setValidLogin(true);
  }

  function handleSignUp() {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
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
            googleSignIn={googleSignIn}
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
