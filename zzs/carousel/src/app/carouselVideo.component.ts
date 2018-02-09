import { Component, Input } from '@angular/core';
import { IVideoInfo } from './IVideoInfo';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'carouselVideo',
  templateUrl: './carouselVideo.component.html',
  styleUrls: ['./carouselVideo.component.css']
})
export class CarouselVideoComponent {
  videoSrc;
  imageSrc;
  @Input('video') private video:IVideoInfo;
  ngOnInit(){
      //console.log(this.video.src);
      this.videoSrc = this.video.src;
      this.imageSrc = this.video.image;
  }
  getVideoSrc(){
      //console.log(this.video? this.video.src: ' 1');
      //console.log(this.video? this.video.image: '2 ');
      return this.video? this.video.src: ' ';
  }
  constructor(){
      this.videoSrc = this.video? this.video.src : ' ';
      this.imageSrc = this.video? this.video.image : ' ';
  }
  imageClicked(event:any):void{
      //console.log(event);
      var styles=window.getComputedStyle(event.target);
      var height = styles.height;
      event.target.style.height = height;      
      event.target.style.width = 0;
  }
}
