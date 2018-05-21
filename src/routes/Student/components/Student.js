// The landing component for the student route.
// if a chiild route like student details or question  details is set this component renders that componnent, else renders all the studentsList.
// Tasks performed: populates the student list in local storage == call backend to get student list
//                  gets the student list from local storage and pupulates in the redux.
//                  renders the student list component, which renders the student items which on click takes to the details page of individual student.

import React, { Component } from 'react'
import classes from './Student.scss'
import StudentList from './StudentList'
import Header from "../../components/Header";
export default class Student extends Component {

  componentWillMount = () => {
    this.props.saveStudentsToLS();
    this.props.getStudentsfromLS();
  }

  render() {
    return (
      <div className={classes.container}>
        <Header navigateToChoose={this.props.navigateToChoose}/>
        {this.props.children ? this.props.children :
          <StudentList navigateToDetails={this.props.navigateToDetails} studentList={this.props.studentList}/>
        }
      </div>
    )
  }
}
