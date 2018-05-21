// Renders the list of questions assigned to the student.
// uses the component question item, which renders the inidvidual question assigned to the student.

import React, { Component } from 'react'
import QuestionItem from './QuestionItem'
import classes from './QuestionList.scss'
import _ from 'lodash';

export default class QuestionList extends Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
    }
  }
 
  render() {
    let that = this;
    let questionList = _.map(this.props.myQuestions, (question, key) => {
      return <QuestionItem studentId={this.props.studentId} navigateToQuestionDetails={this.props.navigateToQuestionDetails} question={question} index={key} key={question.id} />
    })

    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.questionText}>Question List</div>
          <div className={classes.questionListHeader}>

            <div className={classes.content}>
              <div className={classes.select}>Assigned Questions</div>
              
            </div>
          </div>
          {questionList}
        </div>
      </div>
    )
  }
}
