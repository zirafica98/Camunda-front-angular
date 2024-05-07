import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { DataLoader } from '../../service/dataLoader';
import { FormGroup,FormBuilder } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'place-input',
  templateUrl: './place.component.html',
  styleUrl:'../../components/style/component-style.css'
})
export class PlaceComponent implements OnInit  {
    place: any = "";
    municipalityCode: any = "";
    PlaceForm: FormGroup;
    isDropdownVisible: boolean = false;
    placeCodeSelect:any = "";
    previousMunicipalityValue: any;
    constructor(private fb:FormBuilder,private globalService:GlobalService, private dataLoader:DataLoader){
        this.PlaceForm = this.fb.group({
          userInput:[''],
          codeInput:['']
        })
      }

      ngOnInit(): void {
        this.globalService.municipalityValue$
          .pipe(
            distinctUntilChanged(),
          )
          .subscribe((municipality: any) => {
            if (this.previousMunicipalityValue !== municipality && municipality !="") {
              this.previousMunicipalityValue = municipality;
              this.municipalityCode = municipality;
              this.dataLoader.getCodeBookPlace(this.municipalityCode).subscribe(response => {
                this.place = response;
              });
            }
          });
      }


    filterPlace() {
        const userInput = this.PlaceForm.value.userInput.toLowerCase();
        if(userInput != ""){
            return this.place.filter((municipality: { codeDescription: string; }) =>
            municipality.codeDescription.toLowerCase().startsWith(userInput)
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
