export const API_BASE_URL = 'http://40.121.162.245:8082/';
export const THIRD_PARTY_URL = 'http://40.121.162.245/';
export const AD_LOGIN = THIRD_PARTY_URL + 'api/User/login/';
export const GET_AD_USER=THIRD_PARTY_URL+'api/User/GetADUser/';



export const GET_ALL_ENTITIES = API_BASE_URL + 'api/entity';
export const GET_ALL_TENANT_ENTITIES = THIRD_PARTY_URL + 'api/Tenant/GetAllEntities';
export const GET_ENTITIES_WITH_PK = API_BASE_URL + 'withPK';
export const ADD_ENTITY = API_BASE_URL + 'api/entity';
export const GET_TENANT_BY_ID = THIRD_PARTY_URL+'api/Tenant/GetEntityById';
export const ADD_ATTRIBUTE = API_BASE_URL + 'api/attribute';

export const WORKFLOWS=API_BASE_URL+'/api/Workflow';
export const ENTITY_WORKFLOWS = API_BASE_URL+'api/EntityWorkflow';