import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { MyDataSource } from './myDataSource.datasource';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  moduleId: module.id,
  selector: 'teamTable',
  templateUrl: './teamTable.component.html',
  styleUrls: ['./teamTable.component.css']
})
export class TeamTableComponent {
  @Input('team') private team:any;
  @Input('i') private index:number;
  @Input('toSave') private toSave:boolean;
  @ViewChild("d") d:ElementRef;
  @ViewChild("md1") md1:ElementRef;
  @ViewChild("mo1") mo1:ElementRef;
  @ViewChild("md2") md2:ElementRef;
  @ViewChild("mo2") mo2:ElementRef;
  @ViewChild("f") f:ElementRef;

  private correctTotal:number;
  private total:number;
  private bestPlayers:Array<any> = []; //массив лучших
  private correctValues: Array<number> = []; //массив скорректированных данных
  private inputChangedArr: Array<HTMLInputElement> = [];
  private teamEvent:string; //команда, у которой произошло событие
  private attrValue = 0; //значение атрибута, 1-включено

  constructor(private events:MyDataSource) {
    events.getBestPlayerSubject()
      .subscribe(this.changeBestPlayers.bind(this));
    //events.getTotalUpdateSubject()
    //  .subscribe(this.setTotal.bind(this));
  }

  changeBestPlayers(event:Array<any>){
      this.teamEvent = event[0].teamName;
      if(event[0].teamName==this.bestPlayers[0].teamName){
        console.log('changeBestPlayers');
        console.log(event);
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
        setTimeout(this.setTotal.bind(this), 0);
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
    this.correctTotal = this.total;
    this.events.getTotalValuesSubject().next({index:this.index, value: this.correctTotal});
    //this.checkSequence();
    this.events.getCollectResultSubject().subscribe((e)=>{
      if(e){
        let correctTeamArr:Array<number> = [];
        correctTeamArr[0]=parseFloat(this.d.nativeElement.value);
        correctTeamArr[1]=parseFloat(this.md1.nativeElement.value);
        correctTeamArr[2]=parseFloat(this.mo1.nativeElement.value);
        correctTeamArr[3]=parseFloat(this.md2.nativeElement.value);
        correctTeamArr[4]=parseFloat(this.mo2.nativeElement.value);
        correctTeamArr[5]=parseFloat(this.f.nativeElement.value);
        let playerName:Array<string> = [];
        this.bestPlayers.forEach((v, i, a)=>{
          playerName[i] = v;
        });
        let teamName:string = this.bestPlayers[0].teamName;
        this.events.getResultArrSubject().next({teamName, playerName, skills:correctTeamArr,
           index:this.index});
      }
    });
   }

  setTotal(){
    //debugger;
    this.total = this.bestPlayers[1].tempgaPerGame + this.bestPlayers[2].tempdefensive + 
    this.bestPlayers[2].tempoffensive + this.bestPlayers[3].tempdefensive +
    this.bestPlayers[3].tempoffensive + this.bestPlayers[4].tempoffensive;
    console.log(this.bestPlayers[1].tempgaPerGame);
    console.log(this.bestPlayers[4].tempoffensive);
    console.log(this.total);
    this.inputChanged();
  }

  inputChanged(){
    console.log('input changed');
    this.correctTotal = parseFloat(this.d.nativeElement.value)+
      parseFloat(this.md1.nativeElement.value)+parseFloat(this.mo1.nativeElement.value)+
      parseFloat(this.md2.nativeElement.value)+parseFloat(this.mo2.nativeElement.value)+
      parseFloat(this.f.nativeElement.value);
    console.log(this.correctTotal);
    this.events.getTotalValuesSubject().next({index:this.index, value: this.correctTotal});
    this.correctValues = this.events.getTotalValuesArr();
    console.log(this.correctValues);
    //this.checkSequence();
  }

  checkSequence(){ //не работает
    if(this.index > 0){
      if(this.correctTotal > this.correctValues[this.index-1]){
        //debugger;
        this.events.getWarningSubject().next(true);
        console.log(this.correctTotal , this.correctValues[this.index-1]);
      } else{
        this.events.getWarningSubject().next(false);        
      }
    } 
  }

}
