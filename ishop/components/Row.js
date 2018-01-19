import React from 'react';
import PropTypes from 'prop-types';
import {Card} from './Card';
import {rowEvents} from './events';
import {store} from 'D:/FD3/Chaiko/ishop/App';


class Row extends React.Component {

        divClicked = (eo)=>{
            console.log(this.props.vara.IDnumber);
            console.log(store.getState());
            store.dispatch({type:'SHOW_A_CARD', id:this.props.vara.IDnumber, cardWorkMode:1});
        }

        workMode = 1;
        cardWorkMode =4;
        invalidMessage ='';

        shouldComponentUpdate = (nextProps, nextState)=>{
            //debugger;
            var id = nextProps.action.id;
            var IDnumber = this.props.vara.IDnumber;
            if(nextProps.action.type && id==IDnumber){
              return true;
            } else if(nextProps.action.type=='SHOW_A_CARD' && this.cardWorkMode !=4){
              return true;
            } else {
              return false;
            }
        }
        
        render() {
            //debugger;
            var action = this.props.action;
            var productName = this.props.vara.productName;
            var IDnumber = this.props.vara.IDnumber;
            var photo = this.props.vara.photo;
            var quantity = this.props.vara.quantity;
            var price = this.props.vara.price;
            var src = this.props.vara.photo;
            var id = this.props.id;
            console.log(productName+' is rendering');
            switch(action.type){
                case 'DELETE': 
                  //this.workMode = id==IDnumber? action.rowWorkMode: this.workMode;
                  this.workMode = action.rowWorkMode;
                  break;
                case 'SHOW_A_CARD':
                  this.cardWorkMode = id==IDnumber? action.cardWorkMode: 4;
                  //this.cardWorkMode = action.cardWorkMode;
                  break;
                case 'EDIT':
                  this.cardWorkMode = id==IDnumber? action.cardWorkMode: this.cardWorkMode;
                  break;
                case 'NUMBER_VALIDATION':
                  this.invalidMessage = id==IDnumber? action.invalidMessage: this.invalidMessage;
                  break;
                case 'SAVE': 
                  this.cardWorkMode = this.invalidMessage? 2: 4
            }
            if (this.workMode==1)
            return (
                <div className='row'>
                  <div onClick={this.divClicked}>
                    <div key={IDnumber} className='product'>
                      <div className='text'>{productName}</div>
                      <div className='count'>{IDnumber}</div>
                      <div className='photo'></div>
                      <div className='count'>{quantity}</div>
                      <div className='count'>{price}</div>
                    </div>
                  </div>
                    <Card workMode={this.cardWorkMode} productName={productName} 
                      price={price} quantity={quantity} id={id} invalidMessage={this.invalidMessage}
                      action={action}/>
                </div>
            );
            else return (
                <div></div>
            );
        }
}

export {Row};