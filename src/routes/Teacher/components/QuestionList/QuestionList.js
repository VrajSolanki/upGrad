// renders the list of all the questions created by the teacher.
// provides methods to select all or few questions and save them to the redux.
// helps the teacher select students to assign the selected questions.
// provides route to author new question.
// uses the QuestionItem component and exposes actions and props to it to render the question items.

import React, { Component } from "react";
import QuestionItem from "./QuestionItem";
import classes from "./QuestionList.scss";
import CheckboxOn from "components/SvgImages/CheckboxOn";
import CheckboxOff from "components/SvgImages/CheckboxOff";
import UIButton from "components/UIElements/UIButton";
import _ from "lodash";
import DialogueBox from "components/DialogueBox";
import CheckListContainer from "components/UIElements/CheckListContainer";
import {compareArrays} from 'services/compareArrays'

const containerStyle = {
  display: "flex",
  flexDirection: "column"
};

export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  assignToStudents = () => {
    this.props.saveStudentQuestionMap();
    //call function to add question id in student object assigned questions.
  };

  selectAllStudents = value => {
    this.props.toggleAllStudentSelections(value);
  };

  toggleShowModal = () => {
    if (this.state.showModal) this.props.clearSelectedStudents();
    else this.props.populateSelectedStudents();
    this.setState({ showModal: !this.state.showModal });
  };

  updateSelectedQuestions = data => {
    const objToToggle = {
      ...data,
      index: this.props.selectedQuestions.indexOf(data.value)
    };
    this.props.updateSelectedQuestions(objToToggle);
  };

  checkSelected = id => {
    if (this.props.selectedQuestions.indexOf(id) >= 0) return true;
    else return false;
  };

  checkAllQuestionsSelected = () => {
    const allQuestionIDs = _.map(this.props.questions, (question) => question.id)
    const selectedQuestions = this.props.selectedQuestions;
    return compareArrays(allQuestionIDs, selectedQuestions)
  }

  getStudentList = () => {
    return (
      <CheckListContainer
        containerStyle={containerStyle}
        selectedList={this.props.selectedStudents}
        completeList={this.props.studentList}
        toggleCheckbox={this.props.toggleStatus}
        toggleAllCheckbox={this.selectAllStudents}
      />
    );
  };

  onClickAddQuestion = () => {
    this.props.gotoCreateQuestion();
  };

  render() {
    let that = this;

    const isAllSelected = this.checkAllQuestionsSelected();

    let questionList = _.map(that.props.questions, (question, key) => {
      const isSelected = that.checkSelected(question.id);
      return (
        <QuestionItem
          navigateToEditQuestion={this.props.navigateToEditQuestion}
          deleteQuestionReduxAndLS={this.props.deleteQuestionReduxAndLS}
          isSelected={isSelected}
          question={question}
          index={key}
          selectedQuestions={this.props.selectedQuestions}
          key={question.id}
          updateSelectedQuestions={this.updateSelectedQuestions}
        />
      );
    });
    let isDisabled = this.props.selectedQuestions.length > 0 ? false : true;
    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.questionText}>Question List</div>
          <div className={classes.questionListHeader}>
            <div className={classes.selectAll} onClick={() => {this.props.toggleAllQuestionSelections(!isAllSelected)}}>
              <div className={classes.checkbox}>
                {isAllSelected ? <CheckboxOn /> : <CheckboxOff />}
              </div>
              <div>Select All</div>
            </div>

            <div className={classes.content}>
              <div className={classes.select}>Select questions to Assign</div>
              <div className={classes.buttons}>
                <div>
                  <UIButton
                    color="blue"
                    className={classes.assign}
                    onClick={this.toggleShowModal}
                    isDisabled={isDisabled}
                  >
                    Assign
                  </UIButton>
                </div>
                <div>
                  <UIButton
                    type="hollow"
                    className={classes.add}
                    onClick={this.onClickAddQuestion}
                  >
                    Add another question
                  </UIButton>
                </div>
              </div>
            </div>
          </div>
          {questionList}
        </div>
        {this.state.showModal && (
          <DialogueBox
            toggleDialogueBoxDisplay={this.toggleShowModal}
            onClickButton2={this.assignToStudents}
            modalTitle={`Select Students to assign.`}
            button2={`Add`}
            button1={`Cancel`}
            modalBody={this.getStudentList()}
          />
        )}
      </div>
    );
  }
}
