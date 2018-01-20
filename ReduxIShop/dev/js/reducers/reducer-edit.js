export default function(state=null, action){
    switch(action.type){
        case 'EDIT':
          console.log('edit reducer');
          console.log(action.payload);
          return action.payload;
        case 'DELETE':
          return state={...state, cardWorkMode:3, isEditMode:false, rowWorkMode:3};
        case 'CANCEL':
          return state={...state, cardWorkMode:3, isEditMode:false, rowWorkMode:3};
        case 'DEL_CONFIRM':
          console.log('DELETE CONFIRMATION EDIT REDUCER');
          state={...state, rowWorkMode:3};  
          return state;         
    }
    return state? state: {
        cardWorkMode:1, 
        isEditMode:false,
        editUser: {},
    };
}