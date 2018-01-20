export default function(state=null, action){
    switch(action.type){
        case 'DEL_CONFIRM':
          console.log('DELETE CONFIRMATION REDUCER');
          let confirmMode = action.payload.shouldBeDeleted? 0: 1;
          state={...state, confirmMode};  
          console.log(state);
          return state;         
    }
    return state? state: {
        confirmMode: 0,
    };
}