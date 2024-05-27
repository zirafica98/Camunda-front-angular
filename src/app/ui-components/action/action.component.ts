import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { buttonResources, formResources } from '../../resources';
import { PopupComponent } from '../../shared/popup/popup.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: '../style/component-style.css',
})
export class ActionComponent {

  @Input() text: string = "";
  @Input() actionText: string = "";
  @Input() key: string = "";

  constructor(private dialog: MatDialog) { }

  callMethod() {
    switch (this.key) {
      case 'verification': this.openPopUp(); break;
    }
  }

  openPopUp() {
    if (true) {
      let x = window.innerWidth > 600 ? '50vw' : '90vw';

      const buttons: string[] = [buttonResources["send"].text, buttonResources["cancel"].text];

      const dialogRef = this.dialog.open(PopupComponent, {
        width: x,
        height: 'auto',
        data: {
          title: formResources["popupSendCode"].title,
          text: formResources["popupSendCode"].text,
          table: null,
          buttons: buttons,
          icon: 'info'
        }
      });
      //to do - pozvati metodu za slanje koda
      dialogRef.afterClosed().subscribe(result => {
        if (result == "OK") {
          const buttons2: string[] = [buttonResources["ok"].text];

          const dialogRef2 = this.dialog.open(PopupComponent, {
            width: x,
            height: 'auto',
            data: {
              title: formResources["popupVerification"].title,
              text: formResources["popupVerification"].text,
              table: null,
              buttons: buttons2,
              icon: 'checkmark'
            }
          });
        }
      });
    }
  }
}
