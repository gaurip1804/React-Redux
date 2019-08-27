
let newState = {}

const TenantReducer = (state=[],action)=>{
    switch(action.type){
        
        case 'DISPLAY_ALL_TENANTS':
            newState.entityTenants = action.payload;
            break;
        default :  return state;
    }

    return newState;

}

export default TenantReducer;