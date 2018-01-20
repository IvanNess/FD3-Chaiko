export default function(state=null, action){
    switch(action.type){
        case 'SHOW_CONFIRM':
          console.log('SHOW CONFIRM REDUCER');
          state={...state, 
            rowWorkMode:2, 
          };  
          console.log(state);
          return state;         
         
    }
    return state? state: {rowWorkMode:2};
}