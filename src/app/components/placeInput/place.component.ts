import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { DataLoader } from '../../service/dataLoader';
import { FormGroup,FormBuilder } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'place-input',
  templateUrl: './place.component.html',
  styleUrl:'../style/component-style.css',
})
export class PlaceComponent implements OnInit  {
    place: any = "";
    townShipCode: any = "";
    PlaceForm: FormGroup;
    isDropdownVisible: boolean = false;
    placeCodeSelect:any = "";
    previousTownShipValue: any;
    constructor(private fb:FormBuilder,private globalService:GlobalService, private dataLoader:DataLoader){
        this.PlaceForm = this.fb.group({
          userInput:[''],
          codeInput:['']
        })
      }

      ngOnInit(): void {
        this.globalService.townShipValue$
          .pipe(
            distinctUntilChanged(),
          )
          .subscribe((townShip: any) => {
            if (this.previousTownShipValue !== townShip && townShip !="") {
              this.previousTownShipValue = townShip;
              this.townShipCode = townShip;
              this.dataLoader.getCodeBookPlace(this.townShipCode).subscribe(response => {
                this.place = response;
              });
            }
          });
      }


    filterPlace() {
        const userInput = this.PlaceForm.value.userInput.toLowerCase();
        if(userInput != ""){
            return this.place.filter((townShip: { codeDescription: string; }) =>
            townShip.codeDescription.toLowerCase().startsWith(userInput)
          );
        }
        
      }
    
      onSelectPlace(mesto: { code: number, codeDescription: string }) {
        this.PlaceForm.patchValue({
          userInput: mesto.codeDescription,
          codeInput:mesto.code
        });
        this.placeCodeSelect = mesto.code;
        this.isDropdownVisible = false;
        this.globalService.setGlobalPlaceCodeBook(mesto.code);
        this.globalService.setPlaceCodeValue(mesto.code);
      }
    
      toggleDropdownPlace() {
        this.isDropdownVisible = !this.isDropdownVisible;
      }
    
}
