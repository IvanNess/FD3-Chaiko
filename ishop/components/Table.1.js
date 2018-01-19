import React from 'react';
import PropTypes from 'prop-types';
import {Card} from './Card';
import {Row} from './Row';
import {tableEvents} from './events';


class Table extends React.Component {
    
    componentDidMount = () => {
        tableEvents.addListener('changeInputArray', this.changed);                        
    }
    
    componentWillUnmount = () => {
        tableEvents.removeListener('changeInputArray', this.changed);
    }

    changed = (changedParameter)=>{
        debugger;
        var products = this.state.products;
        products.forEach((v,i,a)=>{
            if (v.IDnumber == changedParameter.IDnumber){
                v.price = changedParameter.price;
                v.quantity = changedParameter.quantity;
                return;
            } 
        });
        this.state.products = products.splice();
    }

    
    
 
        state = {
            products : this.props.products
        }  
        
        newClicked = (eo)=>{
            console.log('new has been clicked');
        }

        render() {
            var rows=[];
            this.state.products.forEach(element => {
                //debugger;
                var row = (
                  <Row key={element.IDnumber} vara={element} startWorkMode={4} />
                );
                rows.push(row);
            });
            return (
                <div>
                    {rows}
                    <button onClick={this.newClicked}>новый</button>
                </div>
            );
        }
}

export default Table;