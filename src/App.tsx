import React, { createContext, useReducer } from "react";
import "./main.css";
import { SplitTheCost } from "./components/pages/SplitTheCost";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { UserState } from "./models/models";
import { UserAction, userReducer } from "./actions/appUserActions";
import { CreateNewSheetPage } from "./components/pages/CreateNewSheetPage";
import { PageNotFound } from "./components/pages/PageNotFound";
import { SheetNotFound } from "./components/pages/SheetNotFound";

const initialUserState: UserState = {
  curUser: undefined,
  darkMode: false,
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

  return (
    <Router>
      <UserContext.Provider
        value={{ userState: userState, userDispatch: userDispatch }}
      >
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/create' exact component={CreateNewSheetPage} />
          <Route path='/sheet/:sheetId' exact component={SplitTheCost} />
          <Route path='/invalidsheet' exact component={SheetNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
