

import { getRequest1 } from './action';

export const GetAllEntitiesData = (url, header, type) =>getRequest1(url,type);

export const GetEntityTenant = (url,header,type) => getRequest1(url,type)