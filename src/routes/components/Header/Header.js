// Header is a common component since it is rendered on the top of each page.
// all the root routes include Header at the top and render the children along.
// It also provides the ability to switch roles, from anywhere in the app.

import React, { Component } from 'react'
import classes from './Header.scss'

export default class Header extends Component {
  render() {
    return (
      <div className={classes.container}>
        <img className={classes.imageContainer} src="https://upload.wikimedia.org/wikipedia/commons/1/1a/NewUpGradLogo.png" alt={'upGrad logo'} />
        <div className={classes.navigate} onClick={this.props.navigateToChoose}>Switch Role</div>
      </div>
    )
  }
}
