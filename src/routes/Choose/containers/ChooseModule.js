// Each module performs the following tasks: 
//      defines the name of the reducer object and the reducer object itself with which it would be injected.
//      defines various pure actions to update the redux and thunks to call the external apis.
//      might contain helper functions to format the data, objects accordingly to pass to components or to apis.

import request from 'superagent';
import {NEW_SERVER_URL} from 'store/static'
import { push } from 'react-router-redux';
import update from 'immutability-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'choose';

//export const SAVE_TEACHER_INFO = 'SAVE_TEACHER_INFO' + " " + NAME
export const SET_USER_TYPE = 'SET_USER_TYPE' + " " + NAME

//PURE ACTIONS

export const setUserType = (data) => {
  return { type:SET_USER_TYPE, payload:data }
};

export const navigateToRole = () => {
  return (dispatch, getState) => {
    const userType = getState().choose.userType;
    switch(userType){
      case "teacher": 
        dispatch(push(`/teacher`));
        break;
      
      case "student":
        dispatch(push(`/student`));
        break;
    }
  }
};

const REDUCER_HANDLERS = {
  [SET_USER_TYPE]: (state,action) => {
    return Object.assign({}, state , {userType : action.payload});
  },
};

const initialState = {
  userType: 'teacher'
};

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
