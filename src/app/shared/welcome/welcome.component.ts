import { Component, ComponentRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { buttonResources, formResources, welcomeResources } from '../../resources';
import { DecimalPipe } from '@angular/common';
import { CustomSelectComponent } from '../../ui-components/custom-select/custom-select.component';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
interface myTable {
  text: string;
  value: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  providers: [DecimalPipe]
})

export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Output() notifyParent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(CustomSelectComponent) customSelectComponent!: CustomSelectComponent;
  @ViewChild('errorWrapper', { read: ViewContainerRef }) errorWrapper!: ViewContainerRef;
  errorComponentRef: ComponentRef<ErrorComponent> | undefined;
  errorComponentRef2: ComponentRef<ErrorComponent> | undefined;
  errorComponentRef3: ComponentRef<ErrorComponent> | undefined;

  welcomeResources = welcomeResources;

  value: number = 10000;
  value2: string = "";
  valid: boolean = false;
  minValue = 500;
  maxValue = 100000;
  value3: number = 12;
  minValue2 = 1;
  maxValue2 = 60;
  selected: number = 0;
  accounts: any[] = [{ "number": "540-0123456789-11", "amount": "5000" }, { "number": "544-555456789-33", "amount": "0" }, { "number": "541-9123456789-22", "amount": "150000" }];
  accountNumbers: string[] = [];
  selectedAccount: string = "";
  accountAmount: number = 10000;

  ngOnInit(): void {
    this.onInputChange3();
    if (this.accounts.length == 1) {
      this.selectedAccount = this.accounts[0].number;
      this.valid = true;
    }

    this.accountNumbers=this.accounts.map(account => account.number);
    
    this.accountAmount = parseInt(this.accounts.reduce((max, account) => {
      return Math.max(max, parseInt(account.amount));
    }, 0));
    if (this.accountAmount > 500) {
      if(this.accountAmount>this.maxValue)
        this.value = this.maxValue;
      else
        this.value = this.accountAmount;
    }
    this.onInputChange();
  }

  onInputChange() {
    this.value2 = this.convertWithDot(this.value);
    this.checkValue(parseInt(this.value2.replace(/\./g, '')));
    if (this.value <= this.maxValue && this.value >= this.minValue) {
      (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = (((this.value - this.minValue) / (this.maxValue - this.minValue)) * 100) + "%";
    }
  }

  onInputChange2() {
    this.checkValue(parseInt(this.value2.replace(/\./g, '')));
    let value = parseInt(this.value2.replace(/\./g, ''));
    this.value2 = this.convertWithDot(value);
    if (value <= this.maxValue && value >= this.minValue) {
      this.value = value;
      (document.getElementById("numberInput") as HTMLInputElement).value = this.value2;
      (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = ((this.value / this.maxValue) * 100) + "%";
    }
  }

  onInputChange3() {
    this.checkValue2(this.value3);
    if (this.value3 <= this.maxValue2 && this.value3 >= this.minValue2) {
      (document.getElementById("number2Input") as HTMLInputElement).value = this.value3.toString();
      (document.getElementsByClassName("line")[1] as HTMLDivElement).style.width = (((this.value3 - this.minValue2) / (this.maxValue2 - this.minValue2)) * 100) + "%";
    }
  }

  checkValue(value: number): boolean {
    if (this.errorComponentRef) this.errorComponentRef.destroy();

    if (value && value >= this.minValue && value <= this.maxValue) return true;

    let errorText = 'Vrednost nije validna.';
    if (value < this.minValue) errorText = 'Vrednost ne može biti manja od ' + this.convertWithDot(this.minValue) + ' EUR.';
    if (value > this.minValue) errorText = 'Vrednost ne može biti veća od ' + this.convertWithDot(this.maxValue) + ' EUR.';
    this.errorComponentRef = this.errorWrapper.createComponent(ErrorComponent);
    this.errorComponentRef.instance.text = errorText;

    return false;
  }

  checkValue2(value: number): boolean {
    if (this.errorComponentRef2) this.errorComponentRef2.destroy();

    if (value && value >= this.minValue2 && value <= this.maxValue2) return true;

    let errorText = 'Vrednost nije validna.';
    if (value < this.minValue2) errorText = 'Vrednost ne može biti manja od ' + this.minValue2 + ' meseca.';
    if (value > this.minValue2) errorText = 'Vrednost ne može biti veća od ' + this.maxValue2 + ' meseci.';
    this.errorComponentRef2 = this.errorWrapper.createComponent(ErrorComponent);
    this.errorComponentRef2.instance.text = errorText;

    return false;
  }

  changeModel(num: number) {
    if (num != this.selected) {
      this.selected = num;
    }
  }

  convertWithDot(val: number): string {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  increase(i: number) {
    if (i == 0) {
      this.value += 100;
      this.onInputChange();
    }
    else {
      this.value3++;
      this.onInputChange3();
    }
  }

  decrease(i: number) {
    if (i == 0) {
      this.value -= 100;
      this.onInputChange();
    }
    else {
      this.value3--;
      this.onInputChange3();
    }
  }

  handleFormValidityChange(validity: boolean) {
    this.valid = validity;
  }

  returnLetter(): string {
    if ((this.value3 % 10 == 2 || this.value3 % 10 == 3 || this.value3 % 10 == 4) && this.value3 != 12 && this.value3 != 13 && this.value3 != 14)
      return "a"
    else if (this.value3 % 10 == 1 && this.value3 != 11)
      return ""
    else return "i"
  }

  onValueChange(value: string) {
    this.selectedAccount = value;
    this.accountAmount = parseInt(this.findAmountByNumber(value) || "0");
  }

  findAmountByNumber(selectedNumber: string): string | undefined {
    const selectedAccount = this.accounts.find(account => account.number === selectedNumber);
    if (selectedAccount) return selectedAccount.amount; else return undefined;
  }

  openPopUp() {
    if (this.errorComponentRef3) this.errorComponentRef3.destroy();
    if (this.checkValue(parseInt(this.value2.replace(/\./g, ''))) && this.checkValue2(this.value3)) {
      if (this.valid) {
        if(this.accountAmount>=this.value){
        let x = window.innerWidth > 600 ? '50vw' : '90vw';
        const table: myTable[] = [
          { text: welcomeResources["iznosOrocenja"].text, value: this.value2 + " EUR" },
          { text: welcomeResources["periodOrocenja"].text, value: this.value3 + " mesec" + this.returnLetter() },
          { text: welcomeResources["racunOrocenja"].text, value: this.selectedAccount }
        ];
        const buttons: string[] = [buttonResources["next"].text, buttonResources["cancel"].text];

        const dialogRef = this.dialog.open(PopupComponent, {
          width: x,
          height: 'auto',
          data: {
            title: formResources["popupStartProcess"].title,
            text: formResources["popupStartProcess"].text,
            table: table,
            buttons: buttons,
            icon: 'info'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result == "OK")
            this.notifyParent.emit();
        });
      }
      else{
        this.errorComponentRef3 = this.errorWrapper.createComponent(ErrorComponent);
        this.errorComponentRef3.instance.text = "Na izabranom računu nemate dovoljno sredstava.";
        (document.getElementById("errorWrapper") as HTMLDivElement).scrollIntoView();
      }
      } else this.customSelectComponent.input?.markAsTouched();
    } else (document.getElementById("errorWrapper") as HTMLDivElement).scrollIntoView();
  }
}
