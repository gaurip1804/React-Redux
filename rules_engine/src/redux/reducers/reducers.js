import {combineReducers} from 'redux';
import HomeReducer from "./homeReducer";
import TenantReducer from "./tenantReducer"


const utilsReducers = combineReducers({HomeReducer,TenantReducer});

export default utilsReducers;