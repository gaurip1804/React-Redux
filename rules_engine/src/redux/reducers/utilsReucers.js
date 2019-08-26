
/*
const utilsReducers = (state = {
  isLoading: false,
  loaderStyles: null,
  notificationConf: {
    showNotification: false,
    message: '',
    kind: '',
  },
  language: 'en',
  login: {
    loggedIn: false
  },
  visibilityScope: [],
  userData:'',
  entityId:'',
  allentitiesData : ['data'],
}, action) => {
  
  const newState = Object.assign({}, state);
  switch (action.type) {
    // case 'ACTION_SHOW_LOADING':
    //   newState.isLoading = true;
    //   newState.loaderStyles = action.payload;
    //   return newState;
    // case 'ACTION_HIDE_LOADING':
    //   newState.isLoading = false;
    //   return newState;
      case 'ACTION_ENTITY_ID':
      newState.entityId = action.payload.data;
      return newState;

      case 'DISPLAY_ALL':
        newState.allentitiesData = action.payload.data;
        return newState;

    default: return state;

  }
};
*/

import {combineReducers} from 'redux';
import HomeReducer from "./homeReducer";


const utilsReducers = combineReducers({HomeReducer});

export default utilsReducers;
