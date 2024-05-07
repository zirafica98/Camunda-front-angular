import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { DataLoader } from '../../service/dataLoader';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'street-input',
  templateUrl: './street.component.html',
  styleUrl:'../../components/style/component-style.css'
})
export class StreetComponent {
  streets: any = "";
  streetCode: any = "";
  StreetForm: FormGroup;
  isDropdownVisible: boolean = false;
  streetCodeSelect:any = "";
  previousStreetValue: any;
  constructor(private fb:FormBuilder,private globalService:GlobalService, private dataLoader:DataLoader){
      this.StreetForm = this.fb.group({
        userInput:[''],
        codeInput:['']
      })
    }

    ngOnInit(): void {
      this.globalService.placeValue$
        .pipe(
          distinctUntilChanged(),
        )
        .subscribe((townShip: any) => {
          if (this.previousStreetValue !== townShip && townShip !="") {
            this.previousStreetValue = townShip;
            this.streetCode = townShip;
            this.dataLoader.getCodeBookStreet(this.streetCode).subscribe(response => {
              this.streets = response;
            });
          }
        });
    }


  filterPlace() {
      const userInput = this.StreetForm.value.userInput.toLowerCase();
      if(userInput != ""){
          return this.streets.filter((townShip: { codeDescription: string; }) =>
          townShip.codeDescription.toLowerCase().startsWith(userInput)
        );
      }
      
    }
  
    onSelectPlace(mesto: { code: number, codeDescription: string }) {
      this.StreetForm.patchValue({
        userInput: mesto.codeDescription,
        codeInput:mesto.code
      });
      this.streetCodeSelect = mesto.code;
      this.isDropdownVisible = false;
      this.globalService.setGlobalSelectStreetCodeBookCode(mesto.code);
    }
  
    toggleDropdownPlace() {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
}
