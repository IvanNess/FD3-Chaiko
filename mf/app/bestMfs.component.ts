import { Component, Input, SimpleChange } from '@angular/core';
import { MyDataSource } from './myDataSource.datasource';

@Component({
    selector: 'bestMfs',
    templateUrl: './bestMfs.component.html',
    styleUrls: ['./bestMfs.component.css']
  })
  export class bestMfsComponent {
    @Input('teamArr') private teamArr:Array<any>;
    @Input('updateBestMfs') private updateBestMfs:any;
    @Input('position') private position:string;

    private bestMfsArr:Array<any>; 

    constructor(private dataBase:MyDataSource){
    }  
    
    updateBestMfsFunc(updateBestMfs: any): any{
        //debugger;
        if(!updateBestMfs || this.position!=updateBestMfs[0].myPosition){
            return;
        }
        //debugger;
        var teamName = updateBestMfs[0].teamName;
        var teamBestMfsCounter = 0;
        var n = updateBestMfs.length;
        this.bestMfsArr.every((v, i, a)=>{
            if (v.teamName == teamName){
                if (v.name != updateBestMfs[teamBestMfsCounter].name){
                    //this.bestMfsArr = [...this.bestMfsArr];
                    delete this.bestMfsArr[i];
                    this.bestMfsArr[i] = updateBestMfs[teamBestMfsCounter];
                } 
                teamBestMfsCounter++;
                if(teamBestMfsCounter==n){
                    return false;
                }
            }
            return true;
        })
        return this.handleBestMfsArr(this.bestMfsArr);
    }  

    ngOnChanges(changes: {[property: string]: SimpleChange }) { 
        let change:SimpleChange=changes["updateBestMfs"];
        console.log('новое значение updateBestMfs - '+change.currentValue);
        //debugger;
        if(change.isFirstChange()){
            this.createBestMfsArr();
        } else{
            this.updateBestMfsFunc(this.updateBestMfs);
        }
    }

    //формируем новый массив игроков, в который входят по одному или два первых игрока из каждой команды
    createBestMfsArr():void{
        var bestMfs = [];
        var teamArr = this.teamArr;
        teamArr.forEach((v,i,a)=>{
            //debugger;
            bestMfs.push(v[this.position][0]);
            v[this.position][0].bestMf=true;
            if(this.position=='m'){
                bestMfs.push(v.m[1]);
                v.m[1].bestMf=true;
            }
        });
        this.handleBestMfsArr(bestMfs);    
    }
    handleBestMfsArr(bestMfs:Array<any>):Array<any>{
        //отсортируем полученный массив по тоталу
        //bestMfs.sort((a,b)=> b.total-a.total);
        
        //напишем функцию, которая вычисляет итоговые показатели скилов
        var props = {'playersPitch':5, 'minPoints':20, 'maxPoints': 100}; 
        if(this.position!='m'){
            props= {'playersPitch':5, 'minPoints':60, 'maxPoints': 100};
        }
        function getResultHash(hash, skill, props){ //skill - скил, по которому строится итоговый результат. например, офэнсив или дэфэнсив
            //debugger;
            var pointsPitch = (props.maxPoints - props.minPoints)/(hash.length/props.playersPitch); 
            var minGroupPointsFit = 0; //соответствие итогового скила минимальному количеству очков по скилу в группе
            var maxGroupPointsFit = props.minPoints;
            for(var i = hash.length; i > 0; i-=props.playersPitch){
              var group = hash.slice(i-props.playersPitch, i); //группы, на которые поделились игроки для определения итогового скила
              var maxGroupPoints = hash[i-props.playersPitch-1>=0? i-props.playersPitch-1: 0][skill]; //максимальное количество очков по скилу для группы
              var minGroupPoints = group[group.length-1][skill]; //минимальное количество очков по скилу
              minGroupPointsFit = maxGroupPointsFit; //соответствие итогового скила минимальному количеству очков по скилу в группе
              maxGroupPointsFit = minGroupPointsFit + pointsPitch; //соответствие итогового скила максимальному количеству очков по скилу в группе
              var groupPointPitch = (maxGroupPoints - minGroupPoints)/(maxGroupPointsFit-minGroupPointsFit);
              group.forEach((v,i,a)=>{ 
                //debugger;
                v['temp'+skill] = (v[skill]-minGroupPoints)/groupPointPitch + minGroupPointsFit;
                v['temp'+skill] = Math.round(v['temp'+skill]);
                a[i]['temp'+skill] = a[i]['temp'+skill] <= minGroupPointsFit + props.playersPitch - 1 - i ? minGroupPointsFit + props.playersPitch - 1 - i : a[i]['temp'+skill];
              });
            }
            reduceSkills(hash, 'temp'+skill);
          }
         
        //напишем функцию, которая уменьшает значения скила, если оно равно или больше значения скила предыдущего элемента
        function reduceSkills(hash, skill){
            for(var i=1; i<hash.length; i++){
              hash[i][skill] = hash[i][skill] >= hash[i-1][skill]? hash[i-1][skill]-1 : hash[i][skill];
            }
        }
    
        // получим результаты
        switch(this.position){
            case 'm':
                bestMfs.sort((a,b)=> b.defensive -a.defensive );
                getResultHash(bestMfs, 'defensive', props);
                bestMfs.sort((a,b)=> b.offensive -a.offensive );
                getResultHash(bestMfs, 'offensive', props);
                bestMfs.forEach((v, i, a)=>{v.mainTotal = v.tempoffensive + v.tempdefensive});
                bestMfs.sort((a, b)=> b.mainTotal-a.mainTotal); 
                break;
            case 'f':
                bestMfs.sort((a,b)=> b.offensive -a.offensive );
                getResultHash(bestMfs, 'offensive', props);
                break;      
            case 'g':
                bestMfs.sort((a,b)=> b.rating -a.rating );
                getResultHash(bestMfs, 'rating', props);
                break;    
            case 'd':
                bestMfs.sort((a,b)=> {
                    return a.gaPerGame -b.gaPerGame!=0?
                    a.gaPerGame -b.gaPerGame :
                    b.rating -a.rating;
                });
                getResultHash(bestMfs, 'gaPerGame', props);
                break;                  
        } 
        this.bestMfsArr = bestMfs;  
        console.log(this.bestMfsArr);
        return this.bestMfsArr;        
    }
}
  