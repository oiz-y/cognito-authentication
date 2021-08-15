import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';

const poolData = {
  // setting ids
  UserPoolId: '',
  ClientId: ''
};

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/SignUp">Sing Up</Link>
            </li>
            <li>
              <Link to="/SignIn">Sign In</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/SignUp">
            <SignUp poolData={poolData} />
          </Route>
          <Route path="/SignIn">
            <SignIn poolData={poolData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
