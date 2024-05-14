import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { welcomeResource } from '../../resources';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  providers: [DecimalPipe]
})
export class WelcomeComponent implements OnInit {
  welcomeResource = welcomeResource;
  @Output() notifyParent: EventEmitter<void> = new EventEmitter<void>();

  value: number = 150000;
  value2: string = "";
  minValue = 500;
  maxValue = 300000;
  value3: number = 12;
  minValue2 = 6;
  maxValue2 = 60;
  selected:number=0;

  ngOnInit(): void {
    this.onInputChange();
    this.onInputChange3();
  }

  continue(): void {
    this.notifyParent.emit();
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
}
