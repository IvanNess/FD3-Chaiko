import React from 'react';
import PropTypes from 'prop-types';
import {Card} from './Card';
import {rowEvents} from './events';


class Row extends React.Component {

        divClicked = (eo)=>{
            console.log(this.props.vara.IDnumber);
            rowEvents.emit('rowClicked', this.props.vara.IDnumber);
        }

        deleteClicked = (eo)=>{
            console.log('delete has been clicked');
            rowEvents.emit('deleteClickedEvent', this.props.vara.IDnumber);            
        }

        editClicked = (eo)=>{
            console.log('edit has been clicked');
            rowEvents.emit('editClickedEvent', this.props.vara.IDnumber);
        }

        editClickedEventAnswer = (IDnumber)=>{
            this.setState( {cardWorkMode: IDnumber==this.props.vara.IDnumber? 2: 4} );                                    
        }

        deleteClickedEventAnswer = (IDnumber)=>{
            this.setState( {workMode: IDnumber==this.props.vara.IDnumber? 0: this.state.workMode} );                                    
        }

        state = {
            cardWorkMode: this.props.startWorkMode,
            workMode: 1,
        }

        answer = (IDnumber)=>{
            //debugger;
            this.setState( {cardWorkMode: IDnumber==this.props.vara.IDnumber? 1: 4} );                        
        }

        componentDidMount = () => {
            rowEvents.addListener('rowClicked', this.answer);
            rowEvents.addListener('editClickedEvent', this.editClickedEventAnswer);          
            rowEvents.addListener('deleteClickedEvent', this.deleteClickedEventAnswer);                        
          };
        
        componentWillUnmount = () => {
            rowEvents.removeListener('rowClicked', this.answer);
            rowEvents.removeListener('editClickedEvent', this.editClickedEventAnswer);         
            rowEvents.removeListener('deleteClickedEvent', this.deleteClickedEventAnswer);                                    
          };
        
        render() {
            //debugger;
            var productName = this.props.vara.productName;
            var IDnumber = this.props.vara.idNumber;
            var photo = this.props.vara.photo;
            var quantity = this.props.vara.quantity;
            var price = this.props.vara.price;
            var src = this.props.vara.photo;
            var cardWorkMode = this.state.cardWorkMode;
            if (this.state.workMode==1)
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
                    <button onClick={this.editClicked} > редактировать</button>
                    <button onClick={this.deleteClicked} >удалить</button>
                    <Card workMode={cardWorkMode} productName={productName} price={price} quantity={quantity} />
                </div>
            );
            else return (
                <div></div>
            );
        }
}

export {Row};