import React, { PropTypes } from 'react'
import classes from './Checkbox.scss';
import CheckboxOn from 'components/SvgImages/CheckboxOn';
import CheckboxOff from 'components/SvgImages/CheckboxOff';
import classNames from 'classnames';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      let isChecked = this.props.isChecked;
      let label = this.props.label;
      let isDisabled = this.props.isDisabled;
      let checkboxContainer = classNames({[classes.checkboxContainer]:true},{[classes.checkboxContainerActive]:isChecked})
      let checkboxContainerDisable = classNames({[classes.checkboxContainerDisable]:true},{[classes.checkboxContainerDisableActive]:isChecked})
      return (
          <div className={isDisabled?checkboxContainerDisable:checkboxContainer}>
            <div className={isDisabled?classes.disableCheckbox:classes.checkbox}>
              {isChecked?<CheckboxOn/>:<CheckboxOff/>}
            </div>
            <div className={classes.checkboxLabel}>{label}</div>
          </div>
      )
  }
}

export default Checkbox
