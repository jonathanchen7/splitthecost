import { Button, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";

export interface Props {
  switchView: () => void;
  handleLogin: () => void;
  googleSignIn: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validLogin: boolean;
}

export const Login: React.FC<Props> = ({
  switchView,
  handleLogin,
  googleSignIn,
  email,
  setEmail,
  password,
  setPassword,
  validLogin,
}) => {
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
      />
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
