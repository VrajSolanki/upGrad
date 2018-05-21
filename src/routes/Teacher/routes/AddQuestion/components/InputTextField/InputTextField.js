import React, { Component } from "react";
import classes from "./InputTextField.scss";

export default class InputTextField extends Component {
  updateTextField = e => {
    let param = {};
    param[e.target.name] = e.target.value;
    this.props.updateTextField(param);
  };
  render() {
    return (
      <div className={classes.container}>
        {this.props.label ? (
          <label className={classes.inputLabel}>{this.props.label}</label>
        ) : null}
        <input
          className={classes.inputText}
          type="text"
          value={this.props.value}
          onChange={e => this.updateTextField(e)}
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
