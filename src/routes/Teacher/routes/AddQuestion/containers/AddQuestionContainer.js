import { connect } from "react-redux";
import AddQuestion from "../components";
import {
  updateQuestionType,
  updateMCQAnswers,
  updateAnswers,
  updateTextField,
  createQuestion,
  clearState,
  cancelQuestion
} from "./AddQuestionModule";

const mapActionCreators = {
  updateQuestionType,
  updateMCQAnswers,
  updateAnswers,
  updateTextField,
  createQuestion,
  clearState,
  cancelQuestion
};

const mapStateToProps = state => {
  return {
    questionObject: state.addQuestion.questionObject,
    questionType: state.addQuestion.questionType,
    mode: 'add'
  };
};

export default connect(mapStateToProps, mapActionCreators)(AddQuestion);
