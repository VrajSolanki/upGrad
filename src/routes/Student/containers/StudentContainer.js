// Student container provides props and functions from the redux to the component.
// it is connected to the student module, which has actions and thumks related to the student.

import { connect } from 'react-redux';
import Student from '../components/Student';
import {navigateToDetails} from './StudentModule';
import { getStudentsfromLS, saveStudentsToLS,navigateToChoose } from '../../Teacher/containers/TeacherModule';
const mapActionCreators = {
  navigateToDetails, getStudentsfromLS, saveStudentsToLS,navigateToChoose
};

const mapStateToProps = (state) => {
  return({
    studentList: state.teacher.studentList,
  })
};

export default connect(mapStateToProps, mapActionCreators)(Student)
