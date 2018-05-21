import React, { PropTypes } from 'react'
import { ToastContainer, ToastMessage} from 'react-toastr';
import AlertIconSvg from './SVGs/AlertSVG';
import TickSVG from 'components/SvgImages/AlertTickSvg';
import classes from './Toastr.scss';
import classNames from 'classnames';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Toastr extends React.Component {



  showToast = (message, type) => {
    //  console.log(type);
    let that = this;
      this.refs.toastContainer.success("",
        <div className={classes.alertMessage}>
          <div className={classes.Svg}>
            {type == 'alert' ?
              <AlertIconSvg /> :
                <TickSVG stroke="green" color = "green"/>
            }
          </div>
          <div className={classes.alertText}>
            {message}
          </div>
        </div>
        , {
        timeOut: 1500,
      });
    }

  render () {
    let toastContainerClass = this.props.position != undefined ? this.props.position : "toast-bottom-right";

    let toastrClass = classNames(
      classes.toastr,
      (this.props.position == 'toast-top-center' ? classes.toastr_center : null)
    );
    return (
      <div className={toastrClass}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="toastContainer"
          className = {toastContainerClass}
          preventDuplicates={false}
        />
      </div>
    )
  }
}

export default Toastr;
