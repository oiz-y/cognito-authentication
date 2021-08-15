import React from 'react';
import 'cross-fetch/polyfill';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import './App.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }

  changeHandler(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  submitUserDate() {
    const userData = {
      Username: this.state.userName,
      Password: this.state.password
    };
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(userData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(this.props.poolData);
    const authData = {
      Username: this.state.userName,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(authData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {
        const idToken = result.getIdToken().getJwtToken();
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        console.log('idToken:', idToken);
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        alert('Hi! ' + result.accessToken.payload.username);
      },
      onFailure: function (err) {
        alert('ERROR');
        console.log(err);
      },
    });
  }
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <div>
          <label className="label">User Name</label>
          <input type="text" onChange={(e) => this.changeHandler(e, "userName")} />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="text" onChange={(e) => this.changeHandler(e, "password")} />
        </div>
        <button onClick={() => this.submitUserDate()}>Sign In</button>
      </div>
    );
  }
}

export default SignUp;
