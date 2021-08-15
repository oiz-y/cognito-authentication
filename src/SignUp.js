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
      email: '',
      password: '',
      authCode: '',
      isRegistered: false
    }
  }

  changeHandler(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  submitUserDate() {
    console.log(this.state);
    const attributeList = [];
    const email = {
      Name: 'email',
      Value: this.state.email
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(email);
    attributeList.push(attributeEmail);

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const self = this;
    userPool.signUp(this.state.userName, this.state.password, attributeList, null, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      const cognitoUser = result.user;
      alert('Welcome! ' + cognitoUser.getUsername());
      self.setState({ isRegistered: true });
    });
  }

  submitAuthCode(e) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authData = {
      Username: this.state.userName,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(authData);
    cognitoUser.confirmRegistration(this.state.authCode, true, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      alert('Your Email is CONFIRMED.');
    });
  }
  render() {
    return (
      <div>
        {!this.state.isRegistered ?
          <div>
            <h1>Sign Up</h1>
            <div>
              <label className="label">Email</label>
              <input type="text" onChange={(e) => this.changeHandler(e, "email")} />
            </div>
            <div>
              <label className="label">User Name</label>
              <input type="text" onChange={(e) => this.changeHandler(e, "userName")} />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="text" onChange={(e) => this.changeHandler(e, "password")} />
            </div>
            <button onClick={() => this.submitUserDate()}>
              submit
            </button>
          </div>
          :
          <div>
            <div>
              <label className="label">Auth Code</label>
              <input type="text" onChange={(e) => this.changeHandler(e, "authCode")} />
            </div>
            <button onClick={() => this.submitAuthCode()}>
              submit
            </button>
          </div>
        }
      </div>
    );
  }
}

export default SignUp;
