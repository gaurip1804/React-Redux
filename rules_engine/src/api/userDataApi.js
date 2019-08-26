import {
    get,
    requestHeader
} from './api';
import {
    USER_DATA
} from '../constants/baseURL';

export function getUsersData(requestModel, config) {
    return get(`${USER_DATA}`, requestModel, {
      headers: requestHeader(config)
    });
}