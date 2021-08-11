import React, { createContext, useEffect, useReducer } from "react";
import "./main.css";
import { SplitTheCost } from "./components/pages/SplitTheCost";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { UserState } from "./models/models";
import { UserAction, userReducer } from "./actions/appUserActions";
import { CreateNewSheet } from "./components/pages/CreateNewSheet";
import { PageNotFound } from "./components/pages/PageNotFound";
import { SheetNotFound } from "./components/pages/SheetNotFound";
import { TermsOfService } from "./components/pages/TermsOfService";
import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader';

const initialUserState: UserState = {
  curUser: undefined,
  darkMode: false,
  authenticated: false,
};

export const UserContext = createContext<{
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}>({
  userState: initialUserState,
  userDispatch: () => null,
});

function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    if (userState.darkMode) {
      enableDarkMode({
        brightness: 100,
        contrast: 100,
        sepia: 0
      });
    } else {
      disableDarkMode();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.darkMode]);

  return (
    <Router>
      <UserContext.Provider
        value={{ userState: userState, userDispatch: userDispatch }}
      >
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/create' exact component={CreateNewSheet} />
          <Route path='/sheet/:sheetId' exact component={SplitTheCost} />
          <Route path='/invalidsheet' exact component={SheetNotFound} />
          <Route path='/tos' exact component={TermsOfService} />
          <Route component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
