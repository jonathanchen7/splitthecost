import React from "react";
import "./main.css";
import { SplitTheCost } from "./components/SplitTheCost";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AuthPage } from "./components/auth/AuthPage";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Route path='/' exact component={LandingPage} />
      <Route path='/new' exact component={SplitTheCost} />
      <Route path='/login' exact component={AuthPage} />
      <Route path='/sheet/:sheetId' exact component={SplitTheCost} />
    </Router>
  );
}

export default App;
