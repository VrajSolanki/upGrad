//exposes the various methods, actions to the representational components.

import { connect } from "react-redux";
import Teacher from "../components/Teacher";
import {
  updateSelectedQuestions,
  toggleAllStudentSelections,
  toggleStatus,
  saveQuestionsToLS,
  getQuestionsfromLS,
  saveStudentsToLS,
  getStudentsfromLS,
  saveStudentQuestionMap,
  populateSelectedStudents,
  clearSelectedStudents,
  deleteQuestionReduxAndLS,
  gotoCreateQuestion,
  navigateToChoose,
  navigateToEditQuestion,
  toggleAllQuestionSelections
} from "./TeacherModule";

const mapActionCreators = {
  updateSelectedQuestions,
  toggleAllStudentSelections,
  toggleStatus,
  saveQuestionsToLS,
  getQuestionsfromLS,
  saveStudentsToLS,
  getStudentsfromLS,
  saveStudentQuestionMap,
  populateSelectedStudents,
  clearSelectedStudents,
  deleteQuestionReduxAndLS,
  gotoCreateQuestion,
  navigateToChoose,
  navigateToEditQuestion,
  toggleAllQuestionSelections
};

const mapStateToProps = state => {
  return {
    selectedQuestions: state.teacher.selectedQuestions,
    studentList: state.teacher.studentList,
    selectedStudents: state.teacher.selectedStudents,
    questions: state.teacher.questions
  };
};

export default connect(mapStateToProps, mapActionCreators)(Teacher);
