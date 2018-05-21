import { connect } from "react-redux";
import AddQuestion from "../../AddQuestion/components/AddQuestion";
import {
  updateQuestionType,
  updateMCQAnswers,
  updateAnswers,
  updateTextField,
  clearState,
  getQuestionInfo,
  editQuestion,
  cancelQuestion
} from "../../AddQuestion/containers/AddQuestionModule";

const mapActionCreators = {
  updateQuestionType,
  updateMCQAnswers,
  updateAnswers,
  updateTextField,
  editQuestion,
  clearState,
  getQuestionInfo,
  cancelQuestion
};

const mapStateToProps = (state, ownProps) => {
  return {
    questionObject: state.addQuestion.questionObject,
    questionType: state.addQuestion.questionType,
    mode:"edit",
    questionId: ownProps.params.questionId
  };
};

export default connect(mapStateToProps, mapActionCreators)(AddQuestion);
