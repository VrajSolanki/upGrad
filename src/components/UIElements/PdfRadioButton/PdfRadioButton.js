import React, { PropTypes } from 'react'
import classes from './PdfRadioButton.scss';
import classNames from 'classnames';
import RadioOnSVG from 'components/SvgImages/RadioOnSVG';
import RadioOffSVG from 'components/SvgImages/RadioOffSVG';

class PdfRadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isChecked = this.props.isChecked;
        let radiobuttonContainer = classNames({[classes.radiobuttonContainer]:true},{[classes.radiobuttonContainerActive]:isChecked})
        return (
            <div className={radiobuttonContainer}>
                <div className={classes.radiobutton}>
                {isChecked?<RadioOnSVG/>:<RadioOffSVG/>}
                </div>
                <div className={classes.radiobuttonLabel}>{this.props.label}</div>
            </div>
        )
    }
}

export default PdfRadioButton
