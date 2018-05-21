import request from 'superagent';
import {NEW_SERVER_URL} from 'store/static'
import { push } from 'react-router-redux';
import update from 'immutability-helper';
import {_getQuestionsLS, _getQuestionsToStudentMappingsLS} from '../../../../Teacher/containers/TeacherModule'

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'studentDetails';

//export const SAVE_TEACHER_INFO = 'SAVE_TEACHER_INFO' + " " + NAME
export const CHANGE_DRAWER_STATE = 'CHANGE_DRAWER_STATE' + " " + NAME
export const SAVE_MY_QUESTIONS = 'SAVE_MY_QUESTIONS' + " " + NAME

//PURE ACTIONS

export const saveMyQuestions = (data) => {
  return { type:SAVE_MY_QUESTIONS, payload:data }
};



export const navigateToQuestionDetails = (id, qid) => {
  return (dispatch, getState) => {
    dispatch(push(`/student/${id}/questiondetails/${qid}`));
  }
};

export const getStudentQuestions = (id) =>{
  return (dispatch, getState) => {  
    const allQuestions = _getQuestionsLS();
    const allStudentMappings = _getQuestionsToStudentMappingsLS();

    const currentStudentMappings = _.filter(allStudentMappings, {sId: id});

    let myQuestions = _.map(currentStudentMappings, (studentMapping) => {
      return _.find(allQuestions, {id: studentMapping.qId});
    })
    dispatch(saveMyQuestions(myQuestions));
  }
};


const REDUCER_HANDLERS = {
  [SAVE_MY_QUESTIONS]: (state,action) => {
    return Object.assign({}, state , {myQuestions : action.payload});
  },
};

const initialState = {
  isDrawerOpen: false,
  myQuestions: []
};

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
