"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Table from './components/Table';
import { createStore } from 'redux'
let goods=require('./goods.json');

let reducer = (state, action)=>{

}


let questionText='Как вы относитесь к программированию?';
let defaultFreeAnswerText="???";


ReactDOM.render(
  <Table 
  products={goods}
  question={questionText}
  />
, document.getElementById('container') 
);

