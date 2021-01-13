import { Button, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { User } from "../../models/models";

export interface Props {
  switchView: () => void;
}

export const SignUp: React.FC<Props> = ({ switchView }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  function handleSignUp() {
    if (confirmPassword !== password) {
      setValidConfirmPassword(false);
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setValidEmail(false);
            break;
          case "auth/weak-password":
            setValidPassword(false);
            break;
        }
      })
      .then((response) => {
        if (!!response) {
          const newUser: User = {
            firstName: firstName,
            lastName: lastName,
            id: nanoid(),
            initials: `${firstName
              .charAt(0)
              .toLocaleUpperCase()}${lastName.charAt(0).toLocaleUpperCase()}`,
            displayName: `${firstName} ${lastName}`,
            email: email,
          };

          db.collection("users").doc(newUser.id).set(newUser);
          setValidEmail(true);
          setValidPassword(true);
          setValidConfirmPassword(true);
        }
      });
  }

  return (
    <motion.div
      className='authDiv'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className='authHeader'>
        split the cost | <b>sign up</b>
      </span>
      <form>
        <TextField
          className='authInput'
          fullWidth
          label='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Email'
          error={!validEmail}
          helperText={!validEmail && "Invalid email or email already in use."}
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
          error={!validPassword}
          helperText={!validPassword && "Password too weak."}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Confirm Password'
          type='password'
          error={!validConfirmPassword}
          helperText={!validConfirmPassword && "Passwords do not match."}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <span className='authSubtext'>
        existing user?{" "}
        <b className='authSwitchViewText' onClick={switchView}>
          login
        </b>
      </span>
      <Button className='authButton' onClick={handleSignUp}>
        Sign Up
      </Button>
    </motion.div>
  );
};
