import { Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mfRow',
  templateUrl: './mfRow.component.html',
  styleUrls: ['./mfRow.component.css']
})
export class mfRowComponent {
  @Input('player') private player:any;
  @Input('position') private position:string;

  checkBoxHandler(event:any):void{
      console.log(event);
      if(event.target.checked){
          console.log('true');
          this.player.checked = true;
          this.updateArrEv.emit({player:this.player, checked:true, position:this.position});
      } else{
          console.log('false');
          this.player.checked = false;
          if(this.player.bestMf){
            this.updateArrEv.emit({player:this.player, checked:false, position: this.position});
          }
      }
  }
  @Output("updateArrEv")
  private updateArrEv:EventEmitter<any>=new EventEmitter();
}