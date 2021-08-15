import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';


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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
