import React from 'react';
import 'cross-fetch/polyfill';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import './App.css';

const poolData = {
  UserPoolId: 'ap-northeast-1_5xRCNGPgo',
  ClientId: '56ufe6b4pmufnnloun431dqabb'
};

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
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
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
        alert('Hi! ' + result.accessToken.payload.username);
      },
      onFailure: function (err) {
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
          <input type="text" onChange={(e, key) => this.changeHandler(e, "userName")} />
        </div>
        <div>
          <label className="label">password</label>
          <input type="text" onChange={(e, key) => this.changeHandler(e, "password")} />
        </div>
        <button onClick={() => this.submitUserDate()}>Sign In</button>
      </div>
    );
  }
}

export default SignUp;
