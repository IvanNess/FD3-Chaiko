export default function(state=null, action){
    switch(action.type){
        case 'USER_SELECTED':
          console.log('active user reducer');
          console.log(action.payload);
          return {...action.payload, confirmMode:0};
        case 'CANCEL':
          return state={...state, rowWorkMode:2};
        case 'DELETE':
          console.log('DELETE');
          state={...state, rowWorkMode:3, activeUser:action.payload.activeUser};  
          console.log(state);
          return state;          
        case 'DEL_CONFIRM':
          console.log('DELETE CONFIRMATION ACTIVEUSER REDUCER');
          let confirmMode = action.payload.shouldBeDeleted? 0: 1;
          state={...state, rowWorkMode:3, activeUser:action.payload.activeUser, confirmMode};  
          console.log(state);
          return state;         
        case 'SHOW_CONFIRM':
          console.log('SHOW CONFIRM__ACTIVE REDUCER');
          state={...state, 
            rowWorkMode:2, 
            activeUser:action.payload.activeUser, 
            confirmMode:action.payload.delConfirmMode
          };  
          console.log(state);
          return state;         
         
    }
    return state? state: {activeUser:null, selectedUser:null, rowWorkMode:2, confirmMode:0};
}