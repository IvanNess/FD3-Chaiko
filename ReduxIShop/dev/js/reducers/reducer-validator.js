export default function(state={}, action){
    console.log(state);
    console.log(action);
    switch(action.type){
        case 'VALIDATE':
          state = {...state};
          state[action.payload.index] = {errorMessage:action.payload.errorMessage, value:action.payload.value};
          console.log('Validate State Creation')
          console.log(state);
          return state;
    }
    return state;
}