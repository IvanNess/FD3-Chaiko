import React from 'react';
import PropTypes from 'prop-types';
import {store} from '../App'
import './ValidatedNumber.css';

class ValidatedNumber extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        //debugger;
        return nextProps.action.subId == this.props.subId;
    }

    onSave = (eo)=>{
        //debugger;
        console.log(eo.target);
        console.log(eo);
        store.dispatch({type:'SAVE', id:this.props.id, value: this.newValue, 
          subId:this.props.subId}, )
    }
    onChange = (eo)=>{
        this.newValue = eo.target.value;
        store.dispatch({type:'NUMBER_VALIDATION', id:this.props.id, value:this.newValue, subId:this.props.subId})       
    } 
    newValue = this.props.defaultValue;
    invalidMessage ='';

    render() {
        return (
            <div className='ValidatedNumber'>
              <div>{this.props.invalidMessage}</div>
              <input defaultValue={this.props.defaultValue} onChange={this.onChange} />
              <button onMouseDown={this.onSave}>Сохранить</button>
              <button>Отмена</button>
            </div>
        )
    }
}   

export {ValidatedNumber};