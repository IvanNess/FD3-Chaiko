import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { IVideoInfo } from './IVideoInfo';

@Injectable()
export class VideoDatasource {
    private events:Subject<Array<IVideoInfo>>;

    constructor() {
      this.events=new Subject<Array<IVideoInfo>>();
    }  
    private data:Array<IVideoInfo>=[
        {videoName:'legalMap', src:"https://www.youtube.com/embed/zOx3-R71vaU?rel=0&autoplay=0",
            image:'http://zigzagstudio.by/images/lmapS.jpg', 
            startImage:'lmapS.jpg'},
        {videoName:'woxy', src:"https://www.youtube.com/embed/5EItM6t99HU?rel=0&autoplay=0",
            image:'http://zigzagstudio.by/images/woxS.jpg', startImage:'woxS.jpg'},
        {videoName:'su', src:"https://www.youtube.com/embed/cxx5PPboaPw?rel=0&autoplay=0",
            image:'su.jpg', startImage:'suS.jpg'},
    ];

    makeAnInitArray(quantity:number):Array<IVideoInfo>{
        let initData:Array<IVideoInfo> = [];
        this.data.every((v,i,a)=>{
            if(i<quantity){
                initData.push(v);
                return true;
            } else{
                return false;
            }
        });
        this.events.next(initData);
        return initData;
    }

    getSubject():Subject<Array<IVideoInfo>> {
        return this.events;
    }
}
