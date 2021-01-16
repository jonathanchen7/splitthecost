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
import CloseIcon from "@material-ui/icons/Close";
import { motion } from "framer-motion";
import { UserContext } from "../../App";
import { User } from "../../models/models";
import { nanoid } from "nanoid";

enum CreateSheetStep {
  SheetName = 1,
  DisplayName = 2,
  Email = 3,
}

export const CreateNewSheetPage: React.FC = () => {
  const { appUserDispatch } = useContext(UserContext);
  const history = useHistory();

  const [step, setStep] = useState(CreateSheetStep.SheetName);

  const [sheetName, setSheetName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function createNewSheet() {
    const newUser: User = {
      id: nanoid(),
      firstName: firstName,
      lastName: lastName,
      initials: `${firstName.charAt(0)}${lastName.charAt(
        0
      )}`.toLocaleUpperCase(),
      displayName: `${firstName} ${lastName}`,
      email: email,
    };
    appUserDispatch({ type: "updateCurUser", user: newUser });
    history.push("/sheet/new", { title: sheetName });
  }

  function sheetNameStep() {
    return (
      <>
        <div className='giantHeader'>Let's start with a sheet name:</div>
        <TextField
          className='giantTextField'
          fullWidth
          placeholder='Sheet name'
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          inputProps={{
            className: "giantInput",
          }}
        />
        <FormControlLabel
          className='termsAndConditions'
          control={
            <Checkbox
              value={agreeToTerms}
              onClick={() => setAgreeToTerms(!agreeToTerms)}
              color='primary'
            />
          }
          label={`I accept the splitthecost terms.`}
        />
        <Button
          className='continueButton'
          disabled={!agreeToTerms || !sheetName.trim()}
          onClick={() => setStep(CreateSheetStep.DisplayName)}
        >
          Continue
        </Button>
      </>
    );
  }

  function displayNameStep() {
    return (
      <>
        <div className='giantHeader'>Now, what's your name?</div>
        <div>
          <TextField
            className='giantTextField halfWidthModalInput'
            fullWidth
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            inputProps={{
              className: "giantInput",
            }}
          />
          <TextField
            className='leftMarginLarge giantTextField halfWidthModalInput'
            fullWidth
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            inputProps={{
              className: "giantInput",
            }}
          />
        </div>
        <div>
          <Button className='continueButton' onClick={() => setStep(step - 1)}>
            Previous
          </Button>
          <Button
            className='leftMargin continueButton'
            disabled={!firstName.trim() || !lastName.trim()}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        </div>
      </>
    );
  }

  function emailStep() {
    return (
      <>
        <div className='giantHeader'>
          Finally, what's a good email to send the sheet link to?
        </div>
        <span className='giantHeaderSubtext'>
          (your data is confidential and will NEVER be sold or used for
          marketing purposes.)
        </span>
        <TextField
          className='giantTextField'
          fullWidth
          placeholder='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            className: "giantInput",
          }}
        />
        <div>
          <Button className='continueButton' onClick={() => setStep(step - 1)}>
            Previous
          </Button>
          <Button
            className='leftMargin continueButton'
            disabled={!email.trim()}
            onClick={() => createNewSheet()}
          >
            Finish
          </Button>
        </div>
      </>
    );
  }

  function renderStep() {
    if (step === CreateSheetStep.SheetName) return sheetNameStep();
    if (step === CreateSheetStep.DisplayName) return displayNameStep();
    if (step === CreateSheetStep.Email) return emailStep();
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
            <CloseIcon />
          </IconButton>
        </Link>
        <span className='leftMarginSmall'>
          Create a sheet (Step {step} of 3)
        </span>
      </div>
    </motion.div>
  );
};
