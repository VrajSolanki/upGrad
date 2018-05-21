// Main component when the teacher route is rendered.
// it in turn passes props to the QuestionList and renders the QuestionList, of already created questions.

// on Mount it gets questions list, question to student mapping and student list from local storage, save to redux,
// renders child route like question details, author/ edit route for a question.

import React, { Component } from "react";
import classes from "./Teacher.scss";
import QuestionList from "./QuestionList";
import Header from "../../components/Header";

export default class Teacher extends Component {
  componentWillMount = () => {
    // this.props.saveQuestionsToLS();
    this.props.getQuestionsfromLS();

    this.props.saveStudentsToLS();
    this.props.getStudentsfromLS();
  };  

  render() {
    return (
      <div className={classes.container}>
        <Header navigateToChoose={this.props.navigateToChoose}/>
        {this.props.children ? (
          this.props.children
        ) : (
          <QuestionList
            toggleAllQuestionSelections={this.props.toggleAllQuestionSelections}
            navigateToEditQuestion={this.props.navigateToEditQuestion}
            deleteQuestionReduxAndLS={this.props.deleteQuestionReduxAndLS}
            clearSelectedStudents={this.props.clearSelectedStudents}
            populateSelectedStudents={this.props.populateSelectedStudents}
            saveStudentQuestionMap={this.props.saveStudentQuestionMap}
            questions={this.props.questions}
            toggleStatus={this.props.toggleStatus}
            selectedStudents={this.props.selectedStudents}
            toggleAllStudentSelections={this.props.toggleAllStudentSelections}
            studentList={this.props.studentList}
            selectedQuestions={this.props.selectedQuestions}
            updateSelectedQuestions={this.props.updateSelectedQuestions}
            gotoCreateQuestion={this.props.gotoCreateQuestion}
          />
        )}
      </div>
    );
  }
}
