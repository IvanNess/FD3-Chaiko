export default function(state=null, action){
    switch(action.type){
        case 'USER_SELECTED':
          console.log('active user reducer');
          console.log(action.payload);
          return {...action.payload, confirmMode:0};         
    }
    return state? state: {activeUser:null, selectedUser:null, };
}