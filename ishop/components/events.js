import {EventEmitter} from 'events';

let rowEvents=new EventEmitter(); 
let tableEvents=new EventEmitter(); 

export {rowEvents, tableEvents};
