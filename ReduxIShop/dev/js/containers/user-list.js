import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index'
import {myOnMouseOver} from '../actions/index'
import {validateNumber} from '../actions/index'
import {validateName} from '../actions/index'
import MyUser from './user'
import Card from './card'
import DelConfirm from './delConfirm'


class UserList extends Component{

    createListItems(){
        console.log(this.props.users);
        console.log(this.props);
        return this.props.users.map((user, index)=>{
            return(
                <MyUser key={user.id} user={user}/>
            );
        });
    }

    render(){
        return(
            <div>
                <DelConfirm />
                <Card />
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        users: state.users,
        activeUser: state.activeUser,
        errorMessage: state.validator,
    }
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        selectUser: selectUser,
        mouseOver: myOnMouseOver,
        validateName: validateName,
        validateNumber: validateNumber,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);