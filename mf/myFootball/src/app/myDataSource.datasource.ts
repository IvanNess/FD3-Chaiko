import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { standings } from './standings'
import { Subject } from 'rxjs'
import { Iteam } from './iteam'

@Injectable()
export class MyDataSource {
  standings:Array<Iteam>;
  private events:Subject<Array<Iteam>>;
  private bestPlayerEvents:Subject<Array<any>>;
  private totalUpdate: Subject<boolean>;

  constructor(private http:HttpClient) {
    this.standings = standings.standing;
    this.events=new Subject<Array<Iteam>>();
    this.bestPlayerEvents=new Subject<Array<any>>();
    this.totalUpdate=new Subject<boolean>();
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
    
  getTotalUpdateSubject():Subject<boolean>{
    return this.totalUpdate;
  }


  getObservable():Observable<any> {   
    let options = this.http.options('http://api.football-data.org/v1/competitions/445/leagueTable'); 
    console.log(options);
    return <Observable<any>>this.http
      .get('http://api.football-data.org/v1/competitions/445/leagueTable',
        {headers: 
          {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials":"true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
          }
        }
      );
    }
}
