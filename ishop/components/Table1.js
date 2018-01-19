import React from 'react';
import PropTypes from 'prop-types';
import {Card} from './Card';


class Table extends React.Component {
        divClicked = (eo)=>{
            //debugger;
            console.log(eo);
            this.setState( {workMode:2} );
        }

        state = {
            workMode:4,
        }    

        render() {
            var rows=[];
            this.props.products.forEach(element => {
                //debugger;
                var productName = element.productName;
                var IDnumber = element.IDnumber;
                var photo = element.photo;
                var quantity = element.quantity;
                var price = element.price;
                var row = (
                    <div key={IDnumber} className='product'>
                      <div className='text td'>{productName}</div>
                      <Card price={price} productName={productName} quantity={quantity} workMode={this.state.workMode} />                      
                      <div className='count td'>{IDnumber}</div>
                      <div className='photo td'>
                        <a href={photo}> 
                          {photo}
                        </a>
                      </div>
                      <div className='count td'>{quantity}</div>
                      <div className='count td'>{price}</div>
                    </div>
                );
                rows.push(row);
            });
            return (
                <div onClick={this.divClicked}>
                    {rows}
                </div>
            );
        }
}

export default Table;