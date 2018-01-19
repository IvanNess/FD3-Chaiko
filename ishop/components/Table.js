import React from 'react';
import PropTypes from 'prop-types';
import {Card} from './Card';
import {Row} from './Row';
import {tableEvents} from './events';
import './Table.css';

class Table extends React.Component {

        newClicked = (eo)=>{
            console.log('new has been clicked');
        }

        render() {
            //debugger;
            var rows=[];
            var id = this.props.reduxState.action.id;
            this.props.reduxState.state.forEach(element => {
                //debugger;
                var row = (
                  <Row key={element.IDnumber} vara={element} 
                   id={id} action={this.props.reduxState.action}/>
                );
                rows.push(row);
            });
            return (
                <div className='Table'>
                    {rows}
                    <button onClick={this.newClicked}>новый</button>
                </div>
            );
        }
}

export default Table;