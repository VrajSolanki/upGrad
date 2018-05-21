//rendered at /choose, it assists the user to choose a role: Teacher and Student and navigate to the page.
// renders a login component which provides the user with these options.

import React, { Component } from "react";
import classes from "./Choose.scss";
import Login from "./Login";
import Header from '../../components/Header'

export default class Choose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderBody;
    switch (1) {
      case 1:
        renderBody = (
          <div className={classes.stepComponent}>
            <Login navigateToRole={this.props.navigateToRole} setUserType={this.props.setUserType}/>
          </div>
        );
        break;
      default:
        break;
    }
    return (
      <div className={classes.container}>
        <Header />
        <div className={classes.bodyComp}>{renderBody}</div>
      </div>
    );
  }
}
