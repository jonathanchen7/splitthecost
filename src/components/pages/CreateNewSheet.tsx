import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { motion } from "framer-motion";
import { UserContext } from "../../App";
import { User } from "../../models/models";
import { nanoid } from "nanoid";
import { validateName, validateSheetTitle } from "../../logic/logic";

enum CreateSheetStep {
  SheetName = 1,
  DisplayName = 2,
}

export const CreateNewSheet: React.FC = () => {
  const { userDispatch } = useContext(UserContext);
  const history = useHistory();

  const [step, setStep] = useState(CreateSheetStep.SheetName);

  const [sheetTitle, setSheetTitle] = useState("");
  const [validTitle, setValidTitle] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(true);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(true);

  function handleTitleButton() {
    const temp = validateSheetTitle(sheetTitle);
    setValidTitle(temp);
    if (temp) {
      setStep(CreateSheetStep.DisplayName);
    }
  }

  function handleNameButton() {
    const validFirst = validateName(firstName.trim());
    const validLast = validateName(lastName.trim());
    setValidFirstName(validFirst);
    setValidLastName(validLast);

    if (validFirst && validLast) {
      createNewSheet();
    }
  }

  function createNewSheet() {
    const first = firstName.trim();
    const last = lastName.trim();

    const newUser: User = {
      id: nanoid(),
      firstName: first,
      lastName: last,
      initials: `${first.charAt(0)}${last.charAt(0)}`.toLocaleUpperCase(),
      displayName: `${first} ${last}`,
      email: "",
    };
    userDispatch({ type: "updateCurUser", user: newUser });
    history.push({ pathname: "/sheet/new", state: { title: sheetTitle } });
  }

  function sheetNameStep() {
    console.log(agreeToTerms);
    return (
      <>
        <div className='giantHeader'>Give your sheet a name:</div>
        <TextField
          className='giantTextField'
          fullWidth
          placeholder='Sheet name'
          value={sheetTitle}
          onChange={(e) => setSheetTitle(e.target.value)}
          helperText={
            validTitle
              ? ""
              : "Title must be between 3-20 characters (select special characters are allowed)."
          }
          inputProps={{
            className: "giantInput",
          }}
          FormHelperTextProps={{
            className: "giantInputHelperText",
          }}
        />
        <FormControlLabel
          className='termsAndConditions'
          control={
            <Checkbox
              checked={agreeToTerms}
              onClick={() => setAgreeToTerms(!agreeToTerms)}
              color='primary'
            />
          }
          label={
            <>
              I accept the SplitTheCost <Link to='/tos'>terms</Link>.
            </>
          }
        />
        <Button
          className='continueButton'
          disabled={!agreeToTerms}
          onClick={handleTitleButton}
        >
          continue
        </Button>
      </>
    );
  }

  function displayNameStep() {
    return (
      <>
        <div className='giantHeader'>
          Yup, we're basically done. What's your name?
        </div>
        <div>
          <TextField
            className='giantTextField halfWidthModalInput'
            fullWidth
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            helperText={
              validFirstName ? "" : "Please enter a valid first name."
            }
            inputProps={{
              className: "giantInput",
            }}
            FormHelperTextProps={{
              className: "giantInputHelperText",
            }}
          />
          <TextField
            className='leftMarginLarge giantTextField halfWidthModalInput'
            fullWidth
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            helperText={validLastName ? "" : "Please enter a valid last name."}
            inputProps={{
              className: "giantInput",
            }}
            FormHelperTextProps={{
              className: "giantInputHelperText",
            }}
          />
        </div>
        <div>
          <Button
            className='continueButton'
            onClick={() => {
              setStep(step - 1);
            }}
          >
            go back
          </Button>
          <Button
            className='leftMargin continueButton'
            onClick={handleNameButton}
          >
            finish
          </Button>
        </div>
      </>
    );
  }

  function renderStep() {
    if (step === CreateSheetStep.SheetName) return sheetNameStep();
    if (step === CreateSheetStep.DisplayName) return displayNameStep();
    return sheetNameStep();
  }

  return (
    <motion.div
      initial={{ x: 2000 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <Grid className='createNewSheet' container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid className='createNewSheetItem' item xs={8}>
          {renderStep()}
        </Grid>
      </Grid>
      <div className='stepIndicator'>
        <Link to='/'>
          <IconButton size='small'>
            <CloseRoundedIcon />
          </IconButton>
        </Link>
        <span className='leftMarginSmall'>
          Create a sheet (Step {step} of 2)
        </span>
      </div>
    </motion.div>
  );
};
