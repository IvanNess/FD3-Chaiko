import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {validateNumber, myOnSave, myOnCancel} from '../actions/index';

class Card extends Component{
    render(){
        console.log('!!!');
        if(this.props.activeUser)
        if(this.props.cardWorkMode==1) //режим просмотра
        {
            return(
                <div>
                    <div>Название: {this.props.activeUser.first}</div>
                    <div>Цена:{this.props.activeUser.age}</div>
                    <div>Количество:{this.props.activeUser.id}</div>
                </div>
            );
          }
        else if(this.props.cardWorkMode==2) //режим редактирования
        {
            let index1 = 'age';
            let index2 = 'quantity';
            console.log('Card Edit Mode!');
            console.log(this.props.validate);
            console.log(this.props.validate[index1]);
            return(
                <div>
                    <div>Название: {this.props.activeUser.first}</div>
                    <div>
                        <div>{this.props.validate[index1]? 
                          this.props.validate[index1].errorMessage: ''}
                        </div>
                        Цена:
                        <input 
                          index={index1} 
                          defaultValue={this.props.activeUser.age}
                          onChange={(eo)=>{this.props.validateNumber(eo, this.props.activeUser, index1)}}
                        />
                    </div>
                    <div>
                        <div>{this.props.validate[index2]? 
                          this.props.validate[index2].errorMessage: ''}
                        </div>
                        Количество:
                        <input 
                          index={index2} 
                          defaultValue={this.props.activeUser.id}
                          onChange={(eo)=>{this.props.validateNumber(eo, this.props.activeUser, index2)}}
                        />
                    </div>
                    <button onClick={()=>{this.props.onSave(
                        this.props.validate, this.props.activeUser
                        )}}>Сохранить
                    </button>
                    <button onClick={()=>{this.props.onCancel(
                        this.props.activeUser
                    )}}>Отмена</button>
                </div>
            );              
        }
        return<div></div>;
    }
}


function mapStateToProps(state){
    console.log('Card MapStateToProps');
    console.log(state.validator);
    console.log(state.activeUser.activeUser)
    return{
        activeUser: state.activeUser.activeUser,
        cardWorkMode: state.editMode.cardWorkMode,
        validate: state.validator,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
            validateNumber: validateNumber,
            onSave: myOnSave,
            onCancel: myOnCancel,
        },
    dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);