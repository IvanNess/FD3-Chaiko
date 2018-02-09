import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyDataSource } from './myDataSource.datasource' 

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class teamsComponent {
  @Input('team') private team:any;

  constructor(private dataBase:MyDataSource){
  }

  updateArrHandler(event):void{
    console.log(event);
    let bestMfCounter = 0;
    let n = 2; //количество игроков попадающих в топ лучших
    if(event.position!='m'){
      n = 1;
    }
    let bestMfs = [];
    this.team[event.position].every((v, i, a)=>{
      //debugger;
      if(v.checked){
        bestMfs.push(v);
        v.bestMf = true;
        v.myPosition = event.position;
        bestMfCounter++;
        if(bestMfCounter == n){
          return false;
        }
      } 
      return true;
    });
    this.updateBestMfsEv.emit(bestMfs);
    this.dataBase.getBestPlayerSubject().next(bestMfs);
  }
  @Output("updateBestMfsEv")
  private updateBestMfsEv:EventEmitter<any>=new EventEmitter();
}
