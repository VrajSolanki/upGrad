// on click on a particlar question the QuestionDetails is rendered, which gives a detailed view of the question,
// and allows the student to attempt the question.
// when the user clicks on submit, it renders the correct answer. ideal answer and can call an api to save the student response.
// it currently renders submission types based on value of the prop type in the question from passage, mcq or submission. 

import React, { Component } from 'react'
import classes from './QuestionDetails.scss'
import TextAreaInput from 'components/UIElements/TextAreaInput'
import PassageType from './PassageType'
import SubmissionType from './SubmissionType'
import MCQType from './MCQType'
import UIButton from 'components/UIElements/UIButton'
import {compareArrays} from 'services/compareArrays'
import {generateStringFromArray} from 'services/generateStringFromArray';
export default class QuestionDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      showAnswer: false
    }
  }

  componentWillMount = () => {
    this.props.getQuestion(this.props.qId);
  }

  checkSolution = () => {
    const studentAnswers = this.props.mcqAnswers;
    const correctAnswers = this.props.currentQuestion.correctAnswer;
    let correct = compareArrays(correctAnswers, studentAnswers);
    return correct;
  }

  getCorrectAnswersforMCQ = () => {
    return _.map(this.props.currentQuestion.correctAnswer, (correctOption) => this.props.currentQuestion.answerOptions[correctOption])
  }

  getDisplayAnswer = () => {

    const type = this.props.currentQuestion.type;
    let correct = false;
    let correctOptions = [];
    if(type == 'mcq') {
      correct = this.checkSolution();
      correctOptions = this.getCorrectAnswersforMCQ();
    }

    // console.log(type, correct);

    switch(type) {
      case 'sub': return <div className={classes.solution}> No Solutions for Submission Type </div>
                  break;

      case 'passage': return <div className={classes.textAreaContainer}>
                              <TextAreaInput label={`Ideal answer`} name="questionTitle" mode={"view"} value={this.props.currentQuestion.idealAnswer} />
                            </div>    
                      break;

      case 'mcq': return (<div className={classes.mcqSolution}>
                            <div className={classes.value}>{correct ? "Correct Answer!" : "Incorrect."}</div>
                            <div className={classes.correctOptions}>Correct options are: {generateStringFromArray(correctOptions)}</div>
                          </div>)
                      break;        
    }
  }

  getBody = () => {
    const {
      questionTitle,
      questionDescription,
      answerOptions,
      idealAnswer,
      instructions,
      type
    } = this.props.currentQuestion;

    switch(type) {
      case 'sub': return <SubmissionType instructions={instructions} />
                  break;
      case 'passage': return <PassageType instructions={instructions} updatePassageAnswer={this.props.updatePassageAnswer} passageAnswer={this.props.passageAnswer}/>
                      break;
      case 'mcq': return <MCQType mcqAnswers={this.props.mcqAnswers} instructions={instructions} answerOptions={answerOptions} updateMCQAnswers={this.props.updateMCQAnswers}/>
                      break;        
    }
  }
  
  render() {
    const {
      questionTitle,
      questionDescription,
      answerOptions,
      idealAnswer,
      instructions,
      type
    } = this.props.currentQuestion;

    let body = this.getBody();
    const displayAnswer = this.getDisplayAnswer();
   
    return (
      <div className={classes.container}>
        <div className={classes.centerContainer}>

          <div className={classes.titleAndValue}>
            <div className={classes.title}>Question Title</div>
            <div className={classes.name}>{questionTitle ? questionTitle : "NA"}</div>
          </div>
          
          <div className={classes.titleAndValue}>
            <div className={classes.instructions}>Description</div>
            <div className={classes.value}>{questionDescription ? questionDescription : "No Description"}</div>
          </div>
          
          {body}

          {this.state.showAnswer ? displayAnswer : null}
        </div>
          <div className={classes.footerButtons}>
            <UIButton type={`hollow`} className={classes.cancel} onClick={this.props.onCancel}>Cancel</UIButton>
            <UIButton color={`blue`} className={classes.submit} onClick={() => {this.setState({showAnswer: true})}}>Submit</UIButton>
          </div>
      </div>
    )
  }
}
