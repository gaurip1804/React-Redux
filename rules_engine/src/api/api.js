import axios from 'axios';
import {
    BASE_URL
} from '../constants/baseURL';

export function defaultErrorHandler(error) {
  // eslint-disable-next-line no-undef
  alert(error);
  return Promise.reject(error);
}

export const requestHeader = (serviceTokenContext) =>
  ({
    "Access-Application": serviceTokenContext.applicationKey,
    "ApplicationTenantLinkId": serviceTokenContext.applicationTenantLinkId,
    "Client-Token": serviceTokenContext.tenantKey,
    "WebAccess-Token": serviceTokenContext.tokenKey,
    "WebAccess-TokenId": serviceTokenContext.tokenId
  });

const getInitializedApi = () => axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-JsonResponseCase': 'camel',
    'X-Requested-With': 'XMLHttpRequest'
  }
});


export const get = (url, config, errorHandler) => getInitializedApi().get(url, config)
  .catch(errorHandler || defaultErrorHandler);

export const post = (url, data, config, errorHandler) => getInitializedApi().post(url, data, config)
  .catch(errorHandler || defaultErrorHandler);

export const put = (url, data, config, errorHandler) => getInitializedApi().put(url, data, config)
  .catch(errorHandler || defaultErrorHandler);
