// renders the Question List for the questions assigned to the student.

import React, { Component } from 'react'
import classes from './StudentDetails.scss'
import QuestionList from '../../../components/QuestionList'

export default class StudentDetails extends Component {

  componentWillMount = () => { 
    this.props.getStudentQuestions(this.props.studentId);
  }
  
  render() {
    return (
      <div className={classes.container}>
          {this.props.children ? this.props.children : 
          <QuestionList myQuestions={this.props.myQuestions} studentId={this.props.studentId} navigateToQuestionDetails={this.props.navigateToQuestionDetails}/>}
      </div>
    )
  }
}
