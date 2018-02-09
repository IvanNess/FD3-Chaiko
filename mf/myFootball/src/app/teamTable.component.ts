import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyDataSource } from './myDataSource.datasource';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'teamTable',
  templateUrl: './teamTable.component.html',
  styleUrls: ['./teamTable.component.css']
})
export class TeamTableComponent {
  @Input('team') private team:any;

  private total:number;
  private bestPlayers:Array<any> = [];

  constructor(private events:MyDataSource) {
    events.getBestPlayerSubject()
      .subscribe(this.changeBestPlayers.bind(this));
    events.getTotalUpdateSubject()
      .subscribe(this.setTotal.bind(this));
  }

  changeBestPlayers(event:Array<any>){
      console.log('changeBestPlayers');
      console.log(event);
      if(event[0].teamName==this.bestPlayers[0].teamName){
        switch(event[0].myPosition){
          case 'g': 
            this.bestPlayers[0] = event[0];
            break;
          case 'd': 
            this.bestPlayers[1] = event[0];
            break;
          case 'm': 
            this.bestPlayers[2] = event[0];
            this.bestPlayers[3] = event[1];
            break;
          case 'f': 
            this.bestPlayers[4] = event[0];
            break;
        }
      }

  }
  
  ngOnInit(){
    //debugger;
    this.bestPlayers[0] = this.team.g[0];
    this.bestPlayers[1] = this.team.d[0];
    this.bestPlayers[2] = this.team.m[0];
    this.bestPlayers[3] = this.team.m[1];
    this.bestPlayers[4] = this.team.f[0];    
    this.setTotal();
   }

  setTotal(){
    //debugger;
    this.total = this.bestPlayers[1].tempgaPerGame + this.bestPlayers[2].tempdefensive + 
    this.bestPlayers[2].tempoffensive + this.bestPlayers[3].tempdefensive +
    this.bestPlayers[3].tempoffensive + this.bestPlayers[4].tempoffensive;
    //console.log(this.bestPlayers[1].tempgaPerGame);
    //console.log(this.bestPlayers[4].tempoffensive);
    
  }

}
