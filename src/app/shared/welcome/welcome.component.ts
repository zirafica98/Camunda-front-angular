import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { welcomeResource } from '../../resources';
import { DecimalPipe } from '@angular/common';
import { CustomSelectComponent } from '../../components/custom-select/custom-select.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  providers: [DecimalPipe]
})
export class WelcomeComponent implements OnInit {
  welcomeResource = welcomeResource;
  @Output() notifyParent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(CustomSelectComponent) customSelectComponent!:CustomSelectComponent;

  value: number = 150000;
  value2: string = "";
  valid:boolean=false;
  minValue = 500;
  maxValue = 300000;
  value3: number = 12;
  minValue2 = 6;
  maxValue2 = 60;
  selected:number=0;
  accounts:string[]=["540 0123456789 11","541 0123456789 33","542 0123456789 55"];

  ngOnInit(): void {
    this.onInputChange();
    this.onInputChange3();
  }

  continue(): void {
    if(this.valid){
    this.notifyParent.emit();
    }
    else this.customSelectComponent.input?.markAsTouched();
  }

  onInputChange() {
    if (this.value > this.maxValue) {
      this.value = this.maxValue;
    } else if (this.value < this.minValue) {
      this.value = this.minValue;
    }
    this.value2 = this.convertWithDot(this.value);

    //(document.getElementById("numberInput") as HTMLInputElement).value=this.value.toString();
    (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = (((this.value-this.minValue) / (this.maxValue-this.minValue)) * 100) + "%";
  }

  onInputChange2() {
    let value;
    if (this.value2 != "")
      value = parseInt(this.value2.replace(/\./g, ''));
    else value = this.minValue;

    if (value > this.maxValue) {
      value = this.maxValue;
    } else if (value < this.minValue) {
      value = this.minValue;
    }
    this.value2 = this.convertWithDot(value);
    this.value = value;
    (document.getElementById("numberInput") as HTMLInputElement).value = this.value2;
    (document.getElementsByClassName("line")[0] as HTMLDivElement).style.width = ((this.value / this.maxValue) * 100) + "%";
  }

  onInputChange3() {
    if (this.value3 > this.maxValue2) {
      this.value3 = this.maxValue2;
    } else if (this.value3 < this.minValue2) {
      this.value3 = this.minValue2;
    }
    (document.getElementById("number2Input") as HTMLInputElement).value = this.value3.toString();
    (document.getElementsByClassName("line")[1] as HTMLDivElement).style.width = (((this.value3-this.minValue2) / (this.maxValue2-this.minValue2)) * 100) + "%";
  }

  changeModel(num: number) {
    if (num != this.selected) {
      this.selected = num;
    }
  }

  convertWithDot(val:number):string{
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  increase(i:number){
    if(i==0){
      this.value+=100;
      this.onInputChange();
    }
    else{
      this.value3++;
      this.onInputChange3();
    }
  }

  decrease(i:number){
    if(i==0){
      this.value-=100;
      this.onInputChange();
    }
    else{
      this.value3--;
      this.onInputChange3();
    }
  }

  handleFormValidityChange(validity: boolean) {
    this.valid=validity;
  }
}
