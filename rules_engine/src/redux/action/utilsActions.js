import { bindActionCreators } from 'redux';
import store from './../store'
import {TENENT_DATA_URL,AD_LOGIN} from '../../constants/baseURL';
import {GetRequest,PostRequest} from '../../api/apiList'
const showLoadingSymbol = () => (dispatch, getState) => {

  const currentState = getState();
  if (!currentState.utilsReducer.isLoading) {
    dispatch({ type: 'ACTION_SHOW_LOADING' });
  }
};

const hideLoadingSymbol = () => (dispatch, getState) => {
  const currentState = getState();
  if (currentState.utilsReducer.isLoading) {
    dispatch({ type: 'ACTION_HIDE_LOADING' });
  }
};

// const showNotificationMessage = (message, kind, timeout) => (dispatch) => {
//   dispatch({
//     type: 'ACTION_SHOW_NOTIFICATION',
//     payload: {
//       message, kind,
//     },
//   });
//   const notificationTimeOut = timeout || 5000;
//   setTimeout(() => {
//     dispatch({ type: 'ACTION_HIDE_NOTIFICATION' });
//   }, notificationTimeOut);
// };

const loginData = (data) => (dispatch, getState) => {
  dispatch({
    type: 'ACTION_LOGIN_DATA',
    payload: {
      data
    },
  });
};

const display_data = (allentitiesData) => (dispatch,getState) => {
  dispatch({
    type:'DISPLAY_ALL',
    payload : {
      allentitiesData
    }
  })
}

// ---------------------------------Api call functions start ---------------------------------------
// export function testAction() {  
//   return function(dispatch) {
//     const URL=TENENT_DATA_URL ;
//     const header={'content-type':'application/json'}
//     GetRequest(URL,header).then(response=>{
//       dispatch({
//         type: 'TEST_ACTION',
//         payload: response.data
//       });
//     }).catch((error) => {
//       console.log(error);
//     })
//   }
// }
export function getLogin(){
  return function(dispatch){
    const URL=AD_LOGIN ;
    const header={'content-type':'application/json'}
    PostRequest(URL,header).then(response=>{
      dispatch({
        type: 'LOGIN',
        payload: response.data
      });
    }).catch((error) => {
      console.log(error);
    })
  }
}
// ---------------------------------Api call functions end ---------------------------------------

const loadingActions = bindActionCreators(
  {
    showLoadingSymbol,
    hideLoadingSymbol,
    // showNotificationMessage,
    loginData,
    display_data,
    //testAction
  },
  store.dispatch,
);

export default loadingActions;
