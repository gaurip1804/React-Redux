
let newState = {};
 const HomeReducer = (state=[],action)=>{

    switch (action.type) {
          case 'DISPLAY_ALL':
              newState.allentitiesData = action.payload;
            break;

            case 'DISPLAY_ALL_TENANTS':
              newState.alltenants = action.payload;
            break;

        default: return state;
      }

      return newState;
};

export default HomeReducer;