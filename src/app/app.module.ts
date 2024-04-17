import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputComponent } from './components/textInput/textInput';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { StepsWrapComponent } from './shared/stepWrapper/stepWrapper';
import { CamundaService } from './service/camundaConnect';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { ButtonComponent } from './components/buttonInput/button-component';
import { FrameComponent } from './forms/Frame/frame.component';
import { JmbgComponent } from './components/jmbgInput/jmbg.component';
import { JmbgForms } from './forms/JmbgForms/jmbgForms';
import { FnameComponent } from './components/firstNameInput/firstName.component';
import {LnameComponent} from './components/lastNameInput/lastName.component'
import { LoadService } from './forms/LoadService/loadService.component';
import { BasicDataForms2Component } from './forms/basic-data-forms2/basic-data-forms2.component';
import { EmailInputComponent } from './components/email-input/email-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { AddressDataForm } from './forms/address-data-forms/address-data-forms.component';
import { TownShipComponent } from './components/townshipInput/townShip.component';
import { StreetComponent } from './components/streetInput/street.component';
import { PlaceComponent } from './components/placeInput/place.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HouseNumberComponent } from './components/houseNumberInput/houseNumber.component';
import { ApartmanNumberComponent } from './components/ApartmanNumberInput/apartmanNumber.component';
import { ListBoxComponent } from './components/customListBox/customListBox.component';
import { DefaultComponent } from './forms/default/default.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { ActionComponent } from './components/action/action.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TextInputComponent,
    StepsWrapComponent,
    StartCamundaComponent,
    ButtonComponent,
    FrameComponent,
    JmbgComponent,
    JmbgForms,
    FnameComponent,
    LnameComponent,
    BasicDataForms2Component,
    EmailInputComponent,
    PhoneInputComponent,
    CheckboxInputComponent,
    AddressDataForm,
    TownShipComponent,
    StreetComponent,
    PlaceComponent,
    HouseNumberComponent,
    ApartmanNumberComponent,
    ListBoxComponent,
    DefaultComponent,
    CustomInputComponent,
    DynamicFormComponent,
    ActionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CamundaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
