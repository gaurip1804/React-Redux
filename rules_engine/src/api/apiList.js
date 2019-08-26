import {
  getRequest, putRequest, postRequest, deleteRequest, patchRequest, 
} from './axiosUtility';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../constants';

import { getRequest1 } from './action';

/*
  Developer : Sarika
*/
export const GetRequest = (url, header) => getRequest(url);

export const PutRequest = (url, data,header) => putRequest(url, data, {
  ErrorMessage: ERROR_MESSAGE.PUT_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.PUT_SUCCESS,
});

export const PostRequest = (url, data, header) => postRequest(url, data, {
  ErrorMessage: ERROR_MESSAGE.POST_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.POST_SUCCESS,
});

export const DelelteRequest = (url, data) => deleteRequest(url, {
  ErrorMessage: ERROR_MESSAGE.DELETE_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.DELETE_SUCCESS,
});

export const PatchRequest = (url, data,header) => patchRequest(url, data, {
  ErrorMessage: ERROR_MESSAGE.POST_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.POST_SUCCESS,
});
//-------------------------------------------------------------------------------------

/*
  Developer : Gauri
 */

export const GetAllEntitiesData = (url, header, type) =>getRequest1(url,type);

export const GetEntityTenant = (url,header,type) => getRequest1(url,type)