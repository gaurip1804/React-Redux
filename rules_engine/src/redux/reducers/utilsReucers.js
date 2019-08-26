

/*
  Developer : Sarika
*/
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

    default: return state;

  }
};
export default utilsReducers;
