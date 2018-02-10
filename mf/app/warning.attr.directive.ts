import { Directive, ElementRef, Input } from "@angular/core"; 
import { MyDataSource } from "./myDataSource.datasource";

@Directive({ 
  selector: "[warning]", 
}) 
export class WarningDirective { 

  colors:Array<string>=['red','green','blue','cyan','magenta','yellow'];
  @Input("attrValue")
  private attrValue:number;

  constructor(private element: ElementRef, private event: MyDataSource) {
    /*
    this.setRandomColor();
    let timer = setInterval( ()=>{ 
        this.setRandomColor() 
    },2000);
    */
    event.getWarningSubject().subscribe((e)=>{
        //debugger;
        if(e==true){
            //debugger;
            this.element.nativeElement.style.backgroundColor='red';  
        } else{
            this.element.nativeElement.style.backgroundColor='white';              
        }
    
    })
  } 

  setRandomColor():void {
    let randomColorIndex:number
      =Math.floor(Math.random()*this.colors.length);
    let randomColor:string
      =this.colors[randomColorIndex];
    // element:ElementRef - это Ангуляр-обёртка для HTML-тега
    // element.nativeElement - это обычный DOM-элемент
    this.element.nativeElement
      .style.backgroundColor=randomColor;
  }

}
