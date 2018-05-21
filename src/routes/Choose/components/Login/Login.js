//This is the login module rendered from the choose component which assists the user to select a role.
// once clicked on the Login button user navigates to the part of the app based on the role selected.

import React, { Component } from "react";
import classes from "./Login.scss";

export default class Login extends Component {
  selectUserType = (evt) => {
    this.props.setUserType(evt.target.value);
  };

  render() {
    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginComp}>
          <div className={classes.loginHeader}>Please Select Login</div>
          <div className={classes.loginBody}>
            <div>I am a ...</div>
            <div className={classes.userSelect}>
              <div className={classes.radioOptions}>
                <input type="radio" value="student" name="user" onChange={this.selectUserType}/>
                <span className={classes.option}>Student</span>
              </div>
              <div className={classes.radioOptions}>
                <input type="radio" value="teacher" name="user" onChange={this.selectUserType}/>
                <span className={classes.option}>Teacher</span>
              </div>
            </div>
          </div>
          <div className={classes.loginFooter}>
            <div>Please login to continue</div>
            <div className={classes.footerButtons}>
              <div className={classes.cancelButton}>Cancel</div>
              <div
                className={classes.loginButton}
                onClick={() => {this.props.navigateToRole()}}>
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
