import React, { createContext, useReducer } from "react";
import "./main.css";
import { SplitTheCost } from "./components/SplitTheCost";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { UserState, User } from "./models/models";
import { UserAction, userReducer } from "./actions/appUserActions";
import { CreateNewSheetPage } from "./components/pages/CreateNewSheetPage";

export const testUser: User = {
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  id: "testUserId",
  email: "jonathanschen28@gmail.com",
  displayName: "Jonathan Chen",
};

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
        <Route path='/' exact component={HomePage} />
        <Route path='/create' exact component={CreateNewSheetPage} />
        <Route path='/sheet/:sheetId' component={SplitTheCost} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
