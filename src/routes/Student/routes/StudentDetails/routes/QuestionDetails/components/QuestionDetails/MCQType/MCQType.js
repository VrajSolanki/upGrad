// renders the submission screen for a MCQ type question.
// records students submission and saves in the redux. 

import React, { Component } from 'react'
import classes from './MCQType.scss'
import TextAreaInput from 'components/UIElements/TextAreaInput'

export default class MCQType extends Component {

    selectAnswer = e => {
        let sendObj;
        if (e.target.checked) {
          sendObj = {
            value: e.target.checked,
            opt: e.target.value
          };
        } else {
          const index = this.props.mcqAnswers.indexOf(
            e.target.value
          );
          sendObj = {
            value: e.target.checked,
            opt: e.target.value,
            index
          };
        }
        this.props.updateMCQAnswers(sendObj);
      };

  render() {
    const {instructions, answerOptions} = this.props;
    return (
        <div className={classes.container}>
            <div className={classes.titleAndValue}>
                <div className={classes.instructions}>Instructions</div>
                <div className={classes.value}>{instructions ? instructions : "No Instructions"}</div>
            </div>

            <div className={classes.answerOptions}>
              <label className={classes.answerLabel}>Answer Options :</label>
                <div className={classes.answerSelect}>

                    <div className={classes.radioOptions}>
                        <input type="checkbox" value={"option1"} name="user" onChange={e => { this.selectAnswer(e)}}/>
                        <div className={classes.optionInputField}>{answerOptions.option1}</div>
                    </div>

                    <div className={classes.radioOptions}>
                        <input type="checkbox" value={"option2"} name="user" onChange={e => {this.selectAnswer(e)}}/>
                        <div className={classes.optionInputField}>{answerOptions.option2} </div>
                    </div>

                    <div className={classes.radioOptions}>
                        <input type="checkbox" value={"option3"} name="user" onChange={e => { this.selectAnswer(e)}}/>
                        <div className={classes.optionInputField}>{answerOptions.option3} </div>
                    </div>

                    <div className={classes.radioOptions}>
                        <input type="checkbox" value={"option4"} name="user" onChange={e => { this.selectAnswer(e)}}/>
                        <div className={classes.optionInputField}>{answerOptions.option4} </div>
                    </div>
              </div>
            </div>
        </div>
    )
  }
}
