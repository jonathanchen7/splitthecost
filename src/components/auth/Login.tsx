import { Button, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { auth, googleAuthProvider, db } from "../../firebase";
import { User } from "../../models/models";
import { nanoid } from "nanoid";

export interface Props {
  switchView: () => void;
}

export const Login: React.FC<Props> = ({ switchView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(true);

  function handleLogin() {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setValidLogin(false);
    });
    setValidLogin(true);
  }

  function googleSignIn() {
    auth.signInWithPopup(googleAuthProvider).then((userCredentials) => {
      const user = userCredentials.user;
      if (user) {
        const firstName = user.displayName!.split(" ")[0];
        const lastName = user.displayName!.split(" ")[1];
        const newUser: User = {
          firstName: firstName,
          lastName: lastName,
          id: nanoid(),
          initials: `${firstName
            .charAt(0)
            .toLocaleUpperCase()}${lastName.charAt(0).toLocaleUpperCase()}`,
          displayName: user.displayName!,
          email: user.email!,
        };
        db.collection("users").doc(newUser.id).set(newUser);
      }
    });
    setValidLogin(true);
  }

  return (
    <motion.div
      className='authDiv'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className='authHeader'>
        split the cost | <b>login</b>
      </span>
      <form>
        <TextField
          className='authInput'
          fullWidth
          label='Email'
          error={!validLogin}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Password'
          type='password'
          error={!validLogin}
          helperText={!validLogin && "Invalid email/password combination."}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          autoComplete='on'
        />
      </form>
      <span className='authSubtext'>
        new around here?{" "}
        <b className='authSwitchViewText' onClick={switchView}>
          create an account
        </b>
      </span>
      <Button className='googleButton' onClick={googleSignIn}>
        Sign In With Google
      </Button>
      <Button className='authButton' onClick={handleLogin}>
        Login
      </Button>
    </motion.div>
  );
};
