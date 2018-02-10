import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { standings } from './standings'
import { Subject } from 'rxjs'
import { Iteam } from './iteam'

@Injectable()
export class MyDataSource {
  n = 20; //количество команд в чемпионате
  standings:Array<Iteam>;
  private events:Subject<Array<Iteam>>;
  private bestPlayerEvents:Subject<Array<any>>;
  private totalValues: Subject<{index:number, value:number}>;
  private totalValuesArr: Array<number> =[];//массив со значениями текущих тоталов по команде
  private warningEvent: Subject<boolean>;
  private resultArr: Array<any>=[]; //итоговый массив, к-рый будем загружать на сервер
  private resultArrEvent: Subject<{teamName:string, playerName:Array<string>, 
    skills:Array<number>, index:number}>; //события, из которых будет сделан итоговый массив
  private collectResult:Subject<boolean>//запустить сбор данных для итоговог массив. запускается кнопкой сэйв
  

  constructor(private http:HttpClient) {
    this.standings = standings.standing;
    this.events=new Subject<Array<Iteam>>();
    this.bestPlayerEvents=new Subject<Array<any>>();//лучшие игроки на позиции при изменении галочки
    this.totalValues=new Subject<{index:number, value:number}>(); //будет передаваться хэш с индексом
    //  строки и значением текущего тотала по команде
    this.totalValues.subscribe((hash)=>{
      console.log('setTotalValuesArr');
      this.totalValuesArr[hash.index] = hash.value;
      console.log(this.totalValuesArr);      
    });
    this.warningEvent = new Subject<boolean>(); //события, сообщаюшие сменить аттрибут
    this.resultArrEvent = new Subject<{teamName:string, playerName:Array<string>, 
      skills:Array<number>, index: number}>();
    this.collectResult = new Subject<boolean>();
    this.getResultArrSubject().subscribe(({teamName, playerName, skills, index})=>{
      //debugger;
      this.resultArr[index] = {teamName, playerName, skills};
      console.log(this.resultArr);
      if(index==this.n-1){
        this.getObservable();
      }
    });
  }

  getCollectResultSubject():Subject<boolean>{
    return this.collectResult;
  }

  getResultArrSubject():Subject<{teamName:string, playerName:Array<string>, 
    skills:Array<number>, index: number}>{
    return this.resultArrEvent;
  }

  getTotalValuesArr():Array<number>{
    return this.totalValuesArr;
  }
  getTotalValuesSubject():Subject<{index:number, value:number}>{
    return this.totalValues;
  }

  getWarningSubject():Subject<boolean>{
    return this.warningEvent;
  }

  compareTeamNames(standingTeamName:string, whocoredTeamName:string):boolean{
    let splitStandingName = standingTeamName.split(' ');
    let splitWhoscoredName = whocoredTeamName.split(' ');
    if(splitStandingName[0]==splitWhoscoredName[0]){
      switch(splitStandingName[0]){
        case 'Manchester': 
          if(splitStandingName[1]==splitWhoscoredName[1]){
            return true;
          } else{
            return false;
          }
        case 'West': 
          if(splitStandingName[1]==splitWhoscoredName[1]){
            return true;
          } else{
            return false;
          }
        default:
          return true;
      }
    }
    if(splitStandingName[0]=='AFC' && splitWhoscoredName[0]=='Bournemouth'){
      return true;
    }
      return false;
  }

  getSubject():Subject<Array<Iteam>> {
    return this.events;
  }
  getBestPlayerSubject():Subject<Array<any>> {
    return this.bestPlayerEvents;
  }  
  getTeams():Array<Iteam>{
    return this.standings;
  }

  getObservable():Observable<any> {   
    let serverDataString = 'CHAIKO_FIVEASIDE';
    let serverDataString1 = 'LOKTEV_TEST_INFO';

    console.log('INSERT');
    //return <Observable<any>>
    let insertTry = this.http.post('https://fe.it-academy.by/AjaxStringStorage2.php',
        {f: 'INSERT', n:serverDataString, v:JSON.stringify('this.resultArr')},
        {observe: 'response', responseType: 'text'}
      );
      console.log(insertTry);
    let readTry = this.http.post('https://fe.it-academy.by/AjaxStringStorage2.php',
      {f: 'READ', n:serverDataString1},
      {observe: 'response', responseType: 'text'}
    );
    console.log(readTry);

      return
    }
    
}
