import { Button, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";

export interface Props {
  switchView: () => void;
  handleSignUp: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  validEmail: boolean;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validPassword: boolean;
}

export const SignUp: React.FC<Props> = ({
  switchView,
  handleSignUp,
  email,
  setEmail,
  validEmail,
  password,
  setPassword,
  validPassword,
}) => {
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Last Name'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className='authInput'
          fullWidth
          label='Email'
          error={!validEmail}
          helperText={!validEmail && "Invalid email or email already taken."}
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
