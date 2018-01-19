"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Table from './components/Table';
import { createStore } from 'redux';
let goods=require('./goods.json');

const reducer = (state={state:goods}, action)=>{
  //debugger;
  console.log(action);
  let oldAction = state.action;
  let woutOldAction = state.state;
  let newState = {state:woutOldAction, action:action};
  let invalidValidatedSubId = action.invalidValidatedSubId? action.invalidValidatedSubId: [];
  function validateNumber(number){
    if (isNaN(number)){
      newState.action.invalidMessage = 'Введенное значение не является цифрой';
      newState.action.invalidValidatedSubId = [...invalidValidatedSubId, action.id.subId];
    } else{
      if(invalidValidatedSubId.indexOf(number)!=-1){
        newState.action.invalidValidatedSubId = newState.action.invalidValidatedSubId.slice(

        );
      }
    }
    return !isNaN(number);
  }
  function findAnIndexById(arr, id){
    //debugger;
    var index = -1;
    arr.some((element, ind) => {
      if(element.IDnumber==id){
        index = ind;
        return true;
      } else{
        return false;
      }
    });
    return index;
  }
  switch(action.type){
    case 'SHOW_ALL': 
      break;
    case 'SHOW_A_CARD': 
      if((oldAction.type=='EDIT'||oldAction.type=='NUMBER_VALIDATION') && oldAction.id!=action.id){
        newState.action.type='EDIT';
        newState.action.id=oldAction.id;
        newState.action.cardWorkMode=2;
      } else if(oldAction.type=='EDIT'){
        newState.action.type='EDIT';
        newState.action.cardWorkMode=2;
      }
      break;
    case 'CHANGE': 
      console.log(action.id);
      console.log(newState);
      newState.state[action.id].price = action.price;
      break;
    case 'DELETE':
      console.log(action.id);
      console.log(newState);
      break;     
    case 'EDIT':
      console.log(action.id);
      console.log(newState);
      break;       
    case 'NUMBER_VALIDATION':
      console.log(action.id);
      console.log(newState);
      validateNumber(action.value);
      console.log(newState);
      break;       
    case 'SAVE':
      if (validateNumber(action.value)){
        var ind = findAnIndexById(newState.state, action.id);
        newState.state[ind][action.subId] = action.value;
      }
      break;
  }
  return newState;
}
const store = createStore(reducer);

let firstAction = {type:'SHOW_ALL', cardWorkMode:4};
let action = {type:'CHANGE', price:77, id:3};
let firstState = {goods:goods};
let state = {goods:goods};
store.dispatch(firstAction);
console.log('1111');
console.log(store.getState());


let render = ()=>{
  ReactDOM.render(
    <Table 
    reduxState = {store.getState()}
    />
    , document.getElementById('container') 
  );
}

render();
store.subscribe(render);
export {store};
console.log(store.getState());