import React from 'react';
import PropTypes from 'prop-types';
import {ValidatedNumber} from './ValidatedNumber';
import { store } from '../App';
import './Card.css';

class Card extends React.Component {
      deleteClicked = (eo)=>{
        console.log('delete has been clicked');
        store.dispatch({type:'DELETE', id:this.props.id, rowWorkMode:2})
      }

      editClicked = (eo)=>{
        console.log('edit has been clicked');
        store.dispatch({type:'EDIT', id:this.props.id, cardWorkMode:2})
      }

      render() {
        //debugger;
        var workMode = this.props.workMode;
        switch(workMode){
            case 1: return (
              <div className='Card'>
                <div>{this.props.productName}</div>
                <div>{this.props.price}</div>
                <div>{this.props.quantity}</div>
                <button onClick={this.editClicked} > редактировать</button>
                <button onClick={this.deleteClicked} >удалить</button>
              </div>
            );
            case 2: return (              
              <div className='Card'>
                <div>{this.props.productName}</div>
                <ValidatedNumber defaultValue={this.props.price} id={this.props.id} 
                  invalidMessage={this.props.invalidMessage} subId='price' action={this.props.action}/>
                <ValidatedNumber defaultValue={this.props.quantity} id={this.props.id}
                  invalidMessage={this.props.invalidMessage} subId='quantity' action={this.props.action}/>                          
              </div>
            );
            case 3: return (
              <div className='Card'>
                <input type='text' />
                <input type='text' />
                <input type='text' />
                <button>Добавить</button>
                <button>Отмена</button>
              </div>
            );
            case 4: return (
              <div></div>
            ); 
          }
      }
}
export {Card};