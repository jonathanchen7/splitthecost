import React, { createContext, useState } from "react";
import "./main.css";
import { SplitTheCost } from "./components/SplitTheCost";
import { Route, BrowserRouter as Router } from "react-router-dom";
// import { AuthPage } from "./components/auth/AuthPage";
import { LandingPage } from "./components/pages/HomePage";
import { AppUserData, User } from "./models/models";

export const testUser: User = {
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  id: "testUserId",
  email: "jonathanschen28@gmail.com",
  displayName: "Jonathan Chen",
};

const initialAppUserData: AppUserData = {
  curUser: testUser,
  darkMode: false,
};

export const UserContext = createContext<AppUserData>(initialAppUserData);

function App() {
  const [appUserData] = useState(initialAppUserData);

  return (
    <Router>
      <UserContext.Provider value={appUserData}>
        <Route path='/' exact component={LandingPage} />
        {/* <Route path='/login' exact component={AuthPage} />
      <Route path='/sheets' exact component={AuthPage} /> */}
        <Route path='/sheet/:sheetId' component={SplitTheCost} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
