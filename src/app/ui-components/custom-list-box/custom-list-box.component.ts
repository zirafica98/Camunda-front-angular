import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inputResource } from '../../resources';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { DataLoader } from '../../services/dataLoader';

@Component({
  selector: 'app-custom-list-box',
  templateUrl: './custom-list-box.component.html',
  styleUrl: '../style/component-style.css',
})
export class CustomListBoxComponent {

  @Input() key: string = "";
  tooltip: string = "";
  codeBook: any = [];

  isDropdownVisible: boolean = false;
  municipalityCodeSelect: any = "";
  previousValue: any;
  place: any = "";

  @Output() formValidityChange = new EventEmitter<boolean>();

  inputResource = inputResource;

  form: FormGroup;

  get input() { return this.form.get('input') }

  constructor(private fb: FormBuilder, private globalService: GlobalService, private dataLoader:DataLoader) {
    this.form = this.fb.group({
      input: [''],
      codeInput: ['']
    })
    this.form.statusChanges.subscribe(status => {
      this.formValidityChange.emit(status === 'VALID');
    });
  }

  ngOnInit() {
    if(this.key=="municipality")
    this.codeBook = this.globalService.getGlobalCodeBook();
    this.form.get('input')?.addValidators(Validators.required);
    this.form.get('input')?.updateValueAndValidity();
    this.tooltip=inputResource[this.key].tooltip;
    this.addChangeListeners();
  }

  filterMunicipality() {
    const userInput = this.form.value.input.toLowerCase();
    if (userInput != "") {
      return this.codeBook.filter((municipality: { codeDescription: string; }) =>
        municipality.codeDescription.toLowerCase().startsWith(userInput)
      );
    }
    else return this.codeBook;
  }

  onSelectMunicipality(mesto: { code: number, codeDescription: string }) {
    this.form.patchValue({
      input: mesto.codeDescription,
      codeInput: mesto.code
    });
    this.municipalityCodeSelect = mesto.code;
    this.isDropdownVisible = false;
    if (this.key == "municipality") {
      this.globalService.setGlobalMunicipalityCodeBook(mesto.code);
      this.globalService.setMunicipalityCodeValue(mesto.code);
    }
    else if(this.key=="place"){
        this.globalService.setGlobalPlaceCodeBook(mesto.code);
        this.globalService.setPlaceCodeValue(mesto.code);
      }
    else if(this.key=="street"){
        this.globalService.setGlobalSelectStreetCodeBookCode(mesto.code);
      }
  }

  toggleDropdownMunicipality() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  isValid(): boolean {
    const inputControl = this.form.get('input');
    return (inputControl?.invalid && inputControl?.touched) || false;
  }

  addChangeListeners(){
    if(this.key=="place"){
      this.globalService.municipalityValue$
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe((municipality: any) => {
        if (this.previousValue !== municipality && municipality !="") {
          this.previousValue = municipality;
          this.dataLoader.getCodeBookPlace(municipality).subscribe(response => {
            this.codeBook = response;
          });
        }
      });
    }
    else if(this.key=="street"){
      this.globalService.placeValue$
        .pipe(
          distinctUntilChanged(),
        )
        .subscribe((place: any) => {
          if (this.previousValue !== place && place !="") {
            this.previousValue = place;
            this.dataLoader.getCodeBookStreet(place).subscribe(response => {
              this.codeBook = response;
            });
          }
        });
    }
  }
}