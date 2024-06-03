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

  amount: number = 10000;
  amountString: string = "";
  valid: boolean = false;
  amountMinValue = 500;
  amountMaxValue = 100000;
  months: number = 12;
  monthsMinValue = 1;
  monthsMaxValue = 60;
  selected: number = 0;
  accounts: any[] = [{ "number": "540-0123456789-11", "amount": "5000" }, { "number": "544-555456789-33", "amount": "0" }, { "number": "541-9123456789-22", "amount": "150000" }];
  accountNumbers: string[] = [];
  selectedAccount: string = "";
  accountAmount: number = 10000;

  ngOnInit(): void {
    //dohvati prave accounts
    if (this.accounts.length == 1) {
      this.selectedAccount = this.accounts[0].number;
      this.valid = true;
    }

    this.accountNumbers=this.accounts.map(account => account.number);
    
    this.accountAmount = parseInt(this.accounts.reduce((max, account) => {
      return Math.max(max, parseInt(account.amount));
    }, 0));

    if (this.accountAmount > 500) {
      if(this.accountAmount>this.amountMaxValue)
        this.amount = this.amountMaxValue;
      else
        this.amount = this.accountAmount;
    }

    this.amountRangeChange();
    this.monthsChange();
  }

  amountRangeChange() {
    this.amountString = this.convertWithDot(this.amount);
    this.checkValue(parseInt(this.amountString.replace(/\./g, '')));
    if (this.amount <= this.amountMaxValue && this.amount >= this.amountMinValue) {
      (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = (((this.amount - this.amountMinValue) / (this.amountMaxValue - this.amountMinValue)) * 100) + "%";
    }
  }

  amountInputChange() {
    this.checkValue(parseInt(this.amountString.replace(/\./g, '')));
    let value = parseInt(this.amountString.replace(/\./g, ''));
    this.amountString = this.convertWithDot(value);
    if (value <= this.amountMaxValue && value >= this.amountMinValue) {
      this.amount = value;
      (document.getElementById("numberInput") as HTMLInputElement).value = this.amountString;
      (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = ((this.amount / this.amountMaxValue) * 100) + "%";
    }
  }

  monthsChange() {
    this.checkValue2(this.months);
    if (this.months <= this.monthsMaxValue && this.months >= this.monthsMinValue) {
      (document.getElementById("number2Input") as HTMLInputElement).value = this.months.toString();
      (document.getElementsByClassName("line")[1] as HTMLDivElement).style.width = (((this.months - this.monthsMinValue) / (this.monthsMaxValue - this.monthsMinValue)) * 100) + "%";
    }
  }

  checkValue(value: number): boolean {
    if (this.errorComponentRef) this.errorComponentRef.destroy();

    if (value && value >= this.amountMinValue && value <= this.amountMaxValue) return true;

    let errorText = 'Vrednost nije validna.';
    if (value < this.amountMinValue) errorText = 'Vrednost ne može biti manja od ' + this.convertWithDot(this.amountMinValue) + ' EUR.';
    if (value > this.amountMinValue) errorText = 'Vrednost ne može biti veća od ' + this.convertWithDot(this.amountMaxValue) + ' EUR.';
    this.errorComponentRef = this.errorWrapper.createComponent(ErrorComponent);
    this.errorComponentRef.instance.text = errorText;

    return false;
  }

  checkValue2(value: number): boolean {
    if (this.errorComponentRef2) this.errorComponentRef2.destroy();

    if (value && value >= this.monthsMinValue && value <= this.monthsMaxValue) return true;

    let errorText = 'Vrednost nije validna.';
    if (value < this.monthsMinValue) errorText = 'Vrednost ne može biti manja od ' + this.monthsMinValue + ' meseca.';
    if (value > this.monthsMinValue) errorText = 'Vrednost ne može biti veća od ' + this.monthsMaxValue + ' meseci.';
    this.errorComponentRef2 = this.errorWrapper.createComponent(ErrorComponent);
    this.errorComponentRef2.instance.text = errorText;

    return false;
  }

  convertWithDot(val: number): string {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  increase(s:string) {
    if (s == 'amount') {
      this.amount += 100;
      this.amountRangeChange();
    }
    else {
      this.months++;
      this.monthsChange();
    }
  }

  decrease(s:string) {
    if (s=='amount') {
      this.amount -= 100;
      this.amountRangeChange();
    }
    else {
      this.months--;
      this.monthsChange();
    }
  }

  handleFormValidityChange(validity: boolean) {
    this.valid = validity;
  }

  returnLetter(): string {
    if ((this.months % 10 == 2 || this.months % 10 == 3 || this.months % 10 == 4) && this.months != 12 && this.months != 13 && this.months != 14)
      return "a"
    else if (this.months % 10 == 1 && this.months != 11)
      return ""
    else return "i"
  }

  onAccountChange(value: string) {
    this.selectedAccount = value;
    this.accountAmount = parseInt(this.findAmountByNumber(value) || "0");
  }

  findAmountByNumber(selectedNumber: string): string | undefined {
    const selectedAccount = this.accounts.find(account => account.number === selectedNumber);
    if (selectedAccount) return selectedAccount.amount; else return undefined;
  }

  openPopUp() {
    if (this.errorComponentRef3) this.errorComponentRef3.destroy();
    
    if (this.checkValue(parseInt(this.amountString.replace(/\./g, ''))) && this.checkValue2(this.months)) {
      if (this.valid) {
        if(this.accountAmount>=this.amount){
        let x = window.innerWidth > 600 ? '50vw' : '90vw';
        const table: myTable[] = [
          { text: welcomeResources["iznosOrocenja"].text, value: this.amountString + " EUR" },
          { text: welcomeResources["periodOrocenja"].text, value: this.months + " mesec" + this.returnLetter() },
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
