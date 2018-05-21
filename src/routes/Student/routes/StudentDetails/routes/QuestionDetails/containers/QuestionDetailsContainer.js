import { connect } from 'react-redux';
import QuestionDetails from '../components/QuestionDetails';
import {getQuestion, updateMCQAnswers,updatePassageAnswer, onCancel} from './QuestionDetailsModule';

const mapActionCreators = {
  getQuestion, updateMCQAnswers,updatePassageAnswer,onCancel
};

const mapStateToProps = (state, ownProps) => {
  return({
    currentQuestion: state.questionDetails.currentQuestion,
    studentList: state.teacher.studentList,
    qId: ownProps.params.qid,
    mcqAnswers: state.questionDetails.mcqAnswers,
    passageAnswer:state.questionDetails.passageAnswer
  })
};

export default connect(mapStateToProps, mapActionCreators)(QuestionDetails)
