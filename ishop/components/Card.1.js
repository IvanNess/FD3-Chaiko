import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    
      /*static propTypes = {
        code: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        workMode: PropTypes.number.isRequired,
        freeanswer: PropTypes.bool,
        freeanswertext: PropTypes.string.isRequired,
        cbFreeAnswerTextChanged: PropTypes.func.isRequired,
        cbSelected: PropTypes.func.isRequired,
        selectedAnswerCode: PropTypes.number, // может быть null, пока ни один ответ не выбран
      };*/
    
      /*answerClicked = (EO) => {
        this.props.cbSelected(this.props.code);
      }
    
      freeAnswerTextChanged = (EO) => { 
        console.log('VotesAnswer: текст свободного ответа изменён - '+EO.target.value); 
        this.props.cbFreeAnswerTextChanged(EO.target.value);
      }
      */
    
      render() {
        //debugger;
        var workMode = this.props.workMode;
        switch(workMode){
            case 1: return (
              <div>
                <div>{this.props.productName}</div>
                <div>{this.props.price}</div>
                <div>{this.props.quantity}</div>
              </div>
            );
            case 2: return (
              <div>
                <div>{this.props.productName}</div>
                <input type='text' defaultValue = {this.props.price}/>
                <input type='text' defaultValue = {this.props.quantity}/>
                <button>Сохранить</button>
                <button>Отмена</button>
              </div>
            );
            case 3: return (
              <div>
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