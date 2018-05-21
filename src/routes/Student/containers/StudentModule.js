import request from 'superagent';
import {NEW_SERVER_URL} from 'store/static'
import { push } from 'react-router-redux';
import update from 'immutability-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = 'student';

//export const SAVE_TEACHER_INFO = 'SAVE_TEACHER_INFO' + " " + NAME
export const CHANGE_DRAWER_STATE = 'CHANGE_DRAWER_STATE' + " " + NAME

//PURE ACTIONS

export const setActivityConstantsLoader = (data) => {
  return { type:SET_GET_CONSTANTS_LOADER, payload:data }
};


export const navigateToDetails = (id) => {
  return (dispatch, getState) => {
    dispatch(push(`/student/${id}`));
  }
};


export const toggleDrawer = () =>{
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      let currentDrawerState = getState().todden.isDrawerOpen;
      dispatch({ type: CHANGE_DRAWER_STATE, payload: !currentDrawerState})
    });
  }
};


const REDUCER_HANDLERS = {
  [CHANGE_DRAWER_STATE]: (state,action) => {
    return Object.assign({}, state , {isDrawerOpen : action.payload});
  },
  
};

const initialState = {
  isDrawerOpen: false,
};

export default function myReducer (state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
