import { connect } from 'react-redux';
import StudentDetails from '../components/StudentDetails';
import {navigateToQuestionDetails, getStudentQuestions} from './StudentDetailsModule';

const mapActionCreators = {
  navigateToQuestionDetails, getStudentQuestions
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps.params.id)
  return({
    studentList: state.teacher.studentList,
    studentId: ownProps.params.id,
    myQuestions: state.studentDetails.myQuestions
  })
};

export default connect(mapStateToProps, mapActionCreators)(StudentDetails)
