import { Component,  Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'town-ship-input',
  templateUrl: './townShip.component.html',
  styleUrl:'../style/component-style.css',
})
export class TownShipComponent {
  @Input() codeBook:any = [];
  TownShipForm: FormGroup;
  isDropdownVisible: boolean = false;
  townShipCodeSelect:any ="";
  constructor(private fb:FormBuilder,private globalService:GlobalService){
    this.TownShipForm = this.fb.group({
      userInput:[''],
      codeInput:['']
    })
  }



  filterTownShip() {
    const userInput = this.TownShipForm.value.userInput.toLowerCase();
    if(userInput != ""){
      return this.codeBook.filter((townShip: { codeDescription: string; }) =>
        townShip.codeDescription.toLowerCase().startsWith(userInput)
      );
    }
  }

  onSelectTownShip(mesto: { code: number, codeDescription: string }) {
    this.TownShipForm.patchValue({
      userInput: mesto.codeDescription,
      codeInput:mesto.code
    });
    this.townShipCodeSelect = mesto.code;
    this.isDropdownVisible = false;
    this.globalService.setGlobalTownShipCodeBook(mesto.code);
    this.globalService.setTownShipCodeValue(mesto.code);
  }

  toggleDropdownTownShip() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
