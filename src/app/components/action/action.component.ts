import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: '../style/component-style.css',
})
export class ActionComponent {

  @Input() text: string = "";
  @Input() actionText: string = "";
  @Input() key: string = "";


  callMethod(){
    switch(this.key){
      case 'verification':console.log(this.key);break;
    }
  }
}
