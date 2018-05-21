import React, { PropTypes } from 'react'
import {Modal} from 'react-bootstrap'
import Button from 'components/UIElements/Button'
import UIButton from 'components/UIElements/UIButton'
import classes from './DialogueBox.scss'
import classNames from 'classnames'

class DialogueBox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showDialogueBox: this.props.showDialogueBox
    }
  }
  componentDidMount =  () => {
       document.body.addEventListener('click', this.bodyClickHandler);
  }

  componentWillUnmount = () => {
       document.body.removeEventListener('click', this.bodyClickHandler);
  }

  bodyClickHandler = () => {
     if(this.state.showDialogueBox){
       this.setState({showDialogueBox: false})
     }
  }
  onClickContainer = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }
  onClickButton2 = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if(this.props.onClickButton2){
      this.props.onClickButton2();
    }

      this.props.toggleDialogueBoxDisplay();

    this.setState({showDialogueBox: false});
  }

  onClickButton1 = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ showDialogueBox: false });
    this.props.toggleDialogueBoxDisplay();
  }

  open = () => {
    //  console.log('opening');
     this.setState({ showModal: true });
   }

  render () {
    let modalContentClass = classNames(
      classes.modalContent,
      (this.props.size ? classes['Modal--' + this.props.size] : classes['Modal--md'])
    );
    return(
      <div className={classes.container} onClick={(e)=>{e.stopPropagation(); e.preventDefault()}}>
        <div className={modalContentClass}>

          {
            this.props.modalTitle?
              <div className={classes.modalHeader}>
                <div>{this.props.modalTitle}</div>
              </div> :
            null
          }

          <div className={classes.modalBody}>
            {this.props.modalBody}
          </div>

          <div className={classes.modalFooter}>
            {this.props.button1 ?
              <div className={classes.button1Div}>
                {/*<Button type="secondary-light" size="lg" className={classes.button1} onClick={this.onClickButton1}>{this.props.button1}</Button>*/}
                <UIButton onClick={this.onClickButton1} color='grey'> {this.props.button1} </UIButton>
              </div>
            :null
            }
            {
              this.props.button2 ?
                <div className={classes.button2Div}>
                  {/*<Button type="secondary-light" size="lg" className={classes.button2} onClick={this.onClickButton2}>{this.props.button2}</Button>*/}
                  <UIButton onClick={this.onClickButton2} color='pink'> {this.props.button2} </UIButton>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DialogueBox;
