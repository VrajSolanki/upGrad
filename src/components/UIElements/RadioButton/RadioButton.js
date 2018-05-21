import React, { PropTypes } from 'react'
import classes from './RadioButton.scss';
import RadioSVG from 'components/SvgImages/radioSVG';
import classNames from 'classnames';

class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isChecked = this.props.isChecked;
        let label = this.props.label;
        let isDisabled = this.props.isDisabled;
        let radiobuttonContainer = classNames({[classes.radiobuttonContainer]:true},{[classes.radiobuttonContainerActive]:isChecked})
        let radiobuttonContainerDisable = classNames({[classes.radiobuttonContainerDisable]:true})
        return (
            <div className={isDisabled?radiobuttonContainerDisable:radiobuttonContainer}>
                <div className={isDisabled?classes.radiobuttonDisable:classes.radiobutton}>
                    <RadioSVG/>
                </div>
                <div className={classes.radiobuttonLabel}>{label}</div>
            </div>
        )
    }
}

export default RadioButton
