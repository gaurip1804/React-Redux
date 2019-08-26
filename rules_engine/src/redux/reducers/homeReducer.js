
let newState = {};
const HomeReducer = (state=[],action)=>{

    switch (action.type) {
          case 'DISPLAY_ALL':
              newState.allentitiesData = action.payload;
            break;
        default: return newState;
    
      }
      return newState;
};

export default HomeReducer;