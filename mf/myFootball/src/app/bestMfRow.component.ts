import { Component, Input} from '@angular/core';

@Component({
  selector: 'bestMfRow',
  templateUrl: './bestMfRow.component.html',
  styleUrls: ['./bestMfRow.component.css']
})
export class BestMfRowComponent {
  @Input('player') private player:{};
  @Input('position') private position:string;
}