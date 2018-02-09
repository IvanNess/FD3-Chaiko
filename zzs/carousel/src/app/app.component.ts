import { Component } from '@angular/core';
import { VideoDatasource } from './videoProvider.datasource';
import { IVideoInfo } from './IVideoInfo';
import { SlickModule } from 'ngx-slick';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private videoArr:Array<IVideoInfo> = [];
  videoSrc = ' ';
  videoProportion = 1.777;
  video = document.getElementById('videoFrame');

  frameFilling(){
    //console.log('framefilling');
    let video = document.getElementById('videoFrame');    
    var width = parseFloat(window.getComputedStyle(video).width);
    //console.log(width);
    //console.log(this.videoProportion);    
    var height = width/1.777;
    //console.log(height);
    video.style.height = height+'px';    
    var scrollTop = window.pageYOffset;
    //console.log(scrollTop);
    var top= (document.documentElement.clientHeight-height)/2;
    //var left =(document.documentElement.clientWidth-width)/2;
    //console.log(top);
    //console.log(document.documentElement.clientHeight);
    video.style.top = (scrollTop+top)+'px';  
    //video.style.left = left+'px';              
    //console.log(video);

    var close = document.getElementById('close');
    close.style.position='fixed';
    if(document.documentElement.clientWidth<=600){
      close.style.right='0';
      close.style.top=(top - 30)+'px';
    } else{
      close.style.right="calc(20% - 30px)";
      close.style.top=top+'px';
    }

  }

  imageClicked(event:any):void{
    //console.log(event);
    let grayBox = document.getElementById('backgroundBox');
    //console.log(grayBox);
    grayBox.style.height = document.documentElement.clientHeight+'px';
    grayBox.style.width = '100%';
    grayBox.style.display = 'block';

    let video = document.getElementById('videoFrame');
    //document.body.style.overflow = 'hidden';
    video.style.display = 'block';
    var src = this.slides[event.target.alt].videoSrc;
    src = src.slice(0, -1).concat('1');
    video.setAttribute('src', src);

    document.body.style.overflow = 'hidden';
    var close = document.getElementById('close');
    close.style.display = 'inline-block';
    this.frameFilling();
  }

  closeVideo(event){
    let video = document.getElementById('videoFrame');
    //console.log('closevideo');
    //console.log(event);
    let grayBox = document.getElementById('backgroundBox');
    var close = document.getElementById('close');
    var src = video.getAttribute('src');
    src = src.slice(0, -1).concat('0');
    video.setAttribute('src', src);
    video.style.display = 'none';
    close.style.display = 'none';
    grayBox.style.display = 'none';
    //videoWrap.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  hideImage(event:any):void{
    //console.log(event);
    event.target.style.display = 'none';      
    event.target.nextElementSibling.style.display = 'block';
  }

  showImage(event:any):void{
    //console.log(event);
    event.target.style.display = 'none';      
    event.target.previousElementSibling.style.display = 'block';
  }

  constructor(private videoProvider: VideoDatasource){
    videoProvider.getSubject().subscribe(this.getAnVideoArr.bind(this));
  }

  ngOnInit(){
    this.videoProvider.makeAnInitArray(2);
  }

  ngAfterViewInit(){
    this.frameFilling();
    window.addEventListener('resize', this.frameFilling);
  }	

  getAnVideoArr(videoArr:Array<IVideoInfo>){
    //console.log(videoArr);
    this.videoArr = videoArr;
  }

  slides = [
    {img: "http://zigzagstudio.by/images/lmap.jpg", imgS:"http://zigzagstudio.by/images/lmapS.jpg", 
      videoSrc:"https://www.youtube.com/embed/zOx3-R71vaU?rel=0&autoplay=0"}, 
    {img: "http://zigzagstudio.by/images/wox.jpg", imgS: "http://zigzagstudio.by/images/woxS.jpg",
      videoSrc:"https://www.youtube.com/embed/5EItM6t99HU?rel=0&autoplay=0"},
    {img: "http://zigzagstudio.by/images/su.jpg", imgS:"http://zigzagstudio.by/images/suS.jpg", 
      videoSrc:"https://www.youtube.com/embed/cxx5PPboaPw?rel=0&autoplay=0"}, 
    {img: "http://zigzagstudio.by/images/wox.jpg", imgS: "http://zigzagstudio.by/images/woxS.jpg",
      videoSrc:"https://www.youtube.com/embed/5EItM6t99HU?rel=0&autoplay=0"},
    {img: "http://zigzagstudio.by/images/su.jpg", imgS:"http://zigzagstudio.by/images/suS.jpg", 
      videoSrc:"https://www.youtube.com/embed/cxx5PPboaPw?rel=0&autoplay=0"}, 
    {img: "http://zigzagstudio.by/images/lmap.jpg", imgS:"http://zigzagstudio.by/images/lmapS.jpg", 
      videoSrc:"https://www.youtube.com/embed/zOx3-R71vaU?rel=0&autoplay=0"}, 
    ];


  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3,

    "prevArrow" : '<div id="arrow1"><svg height="40px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg></div>',
    "nextArrow" : '<div id="arrow2"><svg height="40px" id="Layer_2" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 "/></svg></div>',

    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  addSlide() {
    //this.slides.push({img: "http://zigzagstudio.by/images/lmapS.jpg"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  afterChange(e) {
    //console.log('afterChange');
  }
}
