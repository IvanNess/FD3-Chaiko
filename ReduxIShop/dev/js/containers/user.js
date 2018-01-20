import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index'
import {myOnMouseOver} from '../actions/index'
import {validateNumber} from '../actions/index'
import {validateName, onMyDelete} from '../actions/index'
import {myEdit, showConfirmWindow} from '../actions/index'


class MyUser extends Component{
    myUpdate=false;
    render(){
        this.myUpdate = false;
        console.log(this.props.user.first+' is rendering');
        console.log(this.props.allactiveUser);
        console.log('editUser');
        console.log(this.props.editUser);        
        console.log(this.props.isEditMode);
        console.log(this.props.editMode);
        switch(this.props.rowWorkMode){
            case(3):
                if(this.props.activeUser.id==this.props.user.id)
                return <div></div>;
            case(1): 
                if(this.props.activeUser.id==this.props.user.id)
                return(
                    <div>
                      <div>Name:{this.props.activeUser?this.props.activeUser.first:''}</div>
                      <div>Age:{this.props.activeUser?this.props.activeUser.age:''}</div>
                      <button onClick={(eo)=>{                        
                        this.props.edit(
                          eo.target,
                          this.props.user, 
                          this.props.editUser)}}>
                        Редактировать
                      </button>
                      <button onClick={()=>{
                          console.log('delete clicked');
                          this.props.showConfirmWindow();
                      }}>Удалить</button>
                    </div>
                )
            case(2):
                return (
                <li 
                  key={this.props.id}
                  onClick = {(eo)=>{
                      console.log('clicked');
                      console.log(this.props.user);
                      console.log(this.props.activeUser);
                      this.myUpdate = true;
                      if(!this.props.isEditMode)
                      this.props.selectUser(this.props.user, this.props.activeUser);
                    }
                  }
                >
                {this.props.user.first} {this.props.user.last}
                </li>
            );
        };
    }
}

function mapStateToProps(state){
    console.log('mapStateToProps!!!')
    return{
        users: state.users,
        allactiveUser: state.activeUser,
        activeUser: state.activeUser.activeUser,
        clickedUser: state.activeUser.clickedUser,
        rowWorkMode: state.editMode.rowWorkMode,
        isEditMode: state.editMode.isEditMode,
        editUser: state.editMode.editUser,
        editMode: state.editMode,
    }
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        selectUser: selectUser,
        mouseOver: myOnMouseOver,
        validateName: validateName,
        validateNumber: validateNumber,
        edit: myEdit,
        onMyDelete: onMyDelete,
        showConfirmWindow
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyUser);