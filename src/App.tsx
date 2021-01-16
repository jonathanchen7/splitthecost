import React, { createContext, useReducer } from "react";
import "./main.css";
import { SplitTheCost } from "./components/SplitTheCost";
import { Route, BrowserRouter as Router } from "react-router-dom";
// import { AuthPage } from "./components/auth/AuthPage";
import { HomePage } from "./components/pages/HomePage";
import { AppUserData, User } from "./models/models";
import { AppUserAction, appUserReducer } from "./actions/appUserActions";
import { CreateNewSheetPage } from "./components/pages/CreateNewSheetPage";

export const testUser: User = {
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  id: "testUserId",
  email: "jonathanschen28@gmail.com",
  displayName: "Jonathan Chen",
};

const initialAppUserData: AppUserData = {
  curUser: undefined,
  darkMode: false,
};

export const UserContext = createContext<{
  appUserData: AppUserData;
  appUserDispatch: React.Dispatch<AppUserAction>;
}>({
  appUserData: initialAppUserData,
  appUserDispatch: () => null,
});

function App() {
  const [appUserData, appUserDispatch] = useReducer(
    appUserReducer,
    initialAppUserData
  );

  return (
    <Router>
      <UserContext.Provider
        value={{ appUserData: appUserData, appUserDispatch: appUserDispatch }}
      >
        {/* <Route path='/login' exact component={AuthPage} />
      <Route path='/sheets' exact component={AuthPage} /> */}
        <Route path='/' exact component={HomePage} />
        <Route path='/new' exact component={CreateNewSheetPage} />
        <Route path='/sheet/:sheetId' component={SplitTheCost} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
