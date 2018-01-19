export default function(state=null, action){
    switch(action.type){
        case 'EDIT':
          console.log('edit reducer');
          console.log(action.payload);
          return action.payload;
        case 'CANCEL':
          return state={...state, cardWorkMode:3, isEditMode:false};
        case 'DELETE':
          return state={...state, cardWorkMode:3, isEditMode:false};
    }
    return state? state: {
        cardWorkMode:1, 
        isEditMode:false,
        editUser: {},
    };
}