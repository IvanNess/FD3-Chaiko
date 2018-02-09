import { Component } from '@angular/core';
import {mfStat} from './thfcMf'
import {teamArr} from './teamArr'
import { MyDataSource } from './myDataSource.datasource';


teamArr.forEach((v,i,a)=>{
  v.m.forEach((vara)=>{
    vara.checked=true;
  });
  v.f.forEach((vara)=>{
    vara.checked=true;
  });
  v.d.forEach((vara)=>{
    vara.checked=true;
  });
  v.g.forEach((vara)=>{
    vara.checked=true;
  });
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private teamArr:Array<any> = teamArr;
  private updateBestMfs: Array<any>;
  private mfsArray:Array<any> = [];
  info;

  constructor(private datasource:MyDataSource) {
    /*
    datasource.getObservable().subscribe((info)=>{
      console.log(info);
      this.info=info;
    });
    */
     
  }
  getTeamArr():Array<{}>{
    //this.datasource.getTeamSubject().next(this.teamArr);
    return this.teamArr;
  }
  updateBestMfsHandler(event):void{
    //debugger;
    console.log(event);
    this.updateBestMfs = event;
  }
  ngOnInit():void{
    //присваеваем защитникам среднюю пропускаемость команды
    let standingTeams = this.datasource.getTeams();
    //debugger;
    standingTeams.forEach((vara, ind, arr)=>{
      this.teamArr.every((v,i,a)=>{
        let continueFlag:boolean = true;
        if(this.datasource.compareTeamNames(vara.teamName, v.d[0].teamName)){
          v.d.forEach((v1, i1, a1)=>{
            v1.gaPerGame = vara.goalsAgainst/vara.playedGames;
          });
          continueFlag = false;
        }
        return continueFlag;
      });
    });
  }
}
