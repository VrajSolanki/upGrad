import React, { PropTypes } from 'react'
import classes from './DialogueBoxWithActions.scss'
import Button from 'components/UIElements/Button'
import UIButton from 'components/UIElements/UIButton'

class DialogueBoxWithActions extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: this.props.showModal
    }
  }

  delete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClickButton3();
    this.props.toggleDialogueBoxDisplay();
    this.setState({showModal: false});
  }

  success = () => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClickButton2();
    this.props.toggleDialogueBoxDisplay();
    this.setState({showModal: false});
  }

  close = () => {
    this.setState({ showModal: false });
    this.props.toggleDialogueBoxDisplay();
 }

 open = () => {
   console.log('opening');
   this.setState({ showModal: true });
 }

  render () {
    let headerStyle = {
      //border:"none",
      borderRadius: '6px 6px 0px 0px',
      backgroundColor: '#F0F0F3'
    }
    return(
       <div className={classes.container} onClick={(e)=>{e.stopPropagation(); e.preventDefault()}}>
         <div className={classes.modalContent}>
           <div className={classes.modalHeader}>
             {
               this.props.modalTitle?
                 <div>{this.props.modalTitle}</div>
               :null
             }
           </div>
           <div className={classes.modalBody}>
             {this.props.modalBody}
           </div>
           <div className={classes.modalFooter}>
             <div className={classes.leftSide}>
               {/*<Button type="secondary-light" size="lg" className={classes.button3} onClick={this.delete}>{this.props.button3}</Button>*/}
               <UIButton size='sm' onClick={this.delete} color='pink'> {this.props.button3} </UIButton>
             </div>
             <div className={classes.rightSide}>
               <div className={classes.button1Div}>
                 {/*<Button type="secondary-light" size="lg" className={classes.button1} onClick={this.close}>{this.props.button1}</Button>*/}
                 <UIButton size='sm' onClick={this.close} color='grey'> {this.props.button1} </UIButton>
               </div>
               <div className={classes.buttonDiv}>
                 {/*<Button type="secondary-light" size="lg" className={classes.button2} onClick={this.success}>{this.props.button2}</Button>*/}
                 <UIButton size='sm' onClick={this.success} color='blue'> {this.props.button2} </UIButton>
               </div>
             </div>
           </div>
        </div>
      </div>
    )
  }
}

export default DialogueBoxWithActions;
