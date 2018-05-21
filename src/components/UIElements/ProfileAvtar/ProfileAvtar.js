import React, { Component } from "react";
import classes from "./ProfileAvtar.scss";
import PropTypes from "prop-types";
import { colors } from "components/UIElements/sass/colors";

const colorPalette = ["java", "gold", "reddishPink", "teal", "orchid"];
class ProfileAvtar extends React.Component {
  render() {
    const { name, index } = this.props;
    const profileText = name.charAt(0).toUpperCase() + name.charAt(1);
    const colorIndex = parseInt(index) % colorPalette.length;
    const profileColor = colorPalette[colorIndex];

    return (
      <div
        className={classes.profileIcon}
        style={{
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.size / 2,
          backgroundColor: !this.props.profileImage && colors[profileColor],
          backgroundImage:
            this.props.profileImage &&
            `url(${this.props.profileImage})`
        }}
      >
        {!this.props.profileImage && (
          <div
            className={classes.profileText}
            style={{
              fontSize: this.props.fontSize
                ? this.props.fontSize
                : this.props.size / 2
            }}
          >{`${profileText}`}</div>
        )}
      </div>
    );
  }
}

ProfileAvtar.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string,
  profileImage: PropTypes.string
};

ProfileAvtar.defaultProps = {
  size: 36,
  name: "",
  index: 0,
  fontSize: 14
};

export default ProfileAvtar;
