
export const selectUser = (user, activeUser)=>{
    console.log('you clicked on user: ', user.first);
    //console.log(user);
    //console.log(activeUser);
    if(activeUser && user.id!=activeUser.id){

        return {
            type: 'USER_SELECTED',
            payload: {activeUser:user, clickedUser: user, rowWorkMode:1}            
        }
    }
    return{
        type: 'USER_SELECTED',
        payload: {activeUser:user, clickedUser: user, rowWorkMode:1}
    };
}

export const myOnMouseOver = (eo)=>{
    console.log('A Mouse is over element: ', eo.target);
    return{
        type: 'MOUSE_OVER',
        payload: {}
    }
}

export const myEdit = (eo, user, editUser)=>{
    console.log('Edit is clicked ');
    if(editUser)
    return{
        type: 'EDIT',
        payload: {
            cardWorkMode: 2,
            isEditMode: true,
            editUser: user,
            rowWorkMode: 1,
        }
    }
}

export const validateNumber = (eo, user, index)=>{
    console.log('Validating number: ', eo.target.value);
    let errorMessage='';
    if (!Number(eo.target.value)){
        errorMessage = 'Введите число...'
    }
    return{
        type: 'VALIDATE',
        payload: {
            errorMessage: errorMessage,
            value: eo.target.value,
            index: index
        }
    }
}

export const myOnSave = (validateArr, activeUser)=>{
    console.log('SAVE');
    console.log(validateArr);
    console.log(activeUser);
    
    return{
        type: 'SAVE',
        payload: {
            validateArr, activeUser
        }
    }
}

export const myOnCancel = ()=>{
    console.log('CANCEL');    
    return{
        type: 'CANCEL',
        payload: {
            rowWorkMode:2,
            cardWorkMode: 3
        }
    }
}

export const onMyDelete = (activeUser)=>{
    console.log('DELETE');    
    console.log(activeUser);
    return{
        type: 'DELETE',
        payload: {
            activeUser
        }
    }
}

export const isDelConfirmed = (shouldBeDeleted)=>{
    console.log('DELETE CONFIRMATION');    
    return{
        type: 'DEL_CONFIRM',
        payload: {
            shouldBeDeleted
        }
    }
}

export const showConfirmWindow = ()=>{
    console.log('SHOW CONFIRM');    
    return{
        type: 'SHOW_CONFIRM',
        payload: {
            delConfirmMode:1
        }
    }
}