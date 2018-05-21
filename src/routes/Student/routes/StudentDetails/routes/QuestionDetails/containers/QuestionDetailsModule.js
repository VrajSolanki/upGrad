import request from 'superagent';
import {NEW_SERVER_URL} from 'store/static'
import { push, goBack } from 'react-router-redux';
import update from 'immutability-helper';
import {_getQuestionsLS} from '../../../../../../Teacher/containers/TeacherModule'

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'questionDetails';

export const CURRENT_QUESTION = 'CURRENT_QUESTION' + " " + NAME
export const UPDATE_MCQ_ANSWERS = 'UPDATE_MCQ_ANSWERS' + " " + NAME
export const UPDATE_PASSAGE_ANSWER = 'UPDATE_PASSAGE_ANSWER' + " " + NAME
export const CLEAR_STATE = 'CLEAR_STATE' + " " + NAME

//PURE ACTIONS

export const currentQuestion = (data) => {
  return { type:CURRENT_QUESTION, payload:data }
};

export const updatePassageAnswer = (data) => {
  return { type:UPDATE_PASSAGE_ANSWER, payload:data }
};

export const updateMCQAnswers = (data) => {
  return { type:UPDATE_MCQ_ANSWERS, payload:data }
};

export const clearState = () => {
  return { type:CLEAR_STATE}
};

export const getQuestion = (questionId) => {
  return (dispatch, getState) => {
    const question = _.find(_getQuestionsLS(), {id: questionId});
    dispatch(currentQuestion(question));
  }
};

export const onCancel = () => {
  return (dispatch, getState) => {
    dispatch(clearState());
    dispatch(goBack());
  }
};

const REDUCER_HANDLERS = {
  [CURRENT_QUESTION]: (state,action) => {
    return Object.assign({}, state , {currentQuestion : action.payload});
  },
  [UPDATE_MCQ_ANSWERS]: (state, action) => {
    let params = action.payload;
    let value = params.value;
    let opt = params.opt;
    let index = params.index;
    if (value) return update(state, { mcqAnswers: { $push: [opt] } });
    else return update(state, { mcqAnswers: { $splice: [[index, 1]] } });
  },
  [UPDATE_PASSAGE_ANSWER]: (state,action) => {
    return Object.assign({}, state , {passageAnswer : action.payload.passageAnswer});
  },
  [CLEAR_STATE]: (state,action) => {
    return Object.assign({}, state , {passageAnswer : ""});
  },
};

const initialState = {
  currentQuestion: {},
  mcqAnswers: [],
  passageAnswer: ""
};

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
