import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputComponent } from './archive/textInput/textInput';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { StepsWrapComponent } from './shared/stepWrapper/stepWrapper';
import { CamundaService } from './service/camundaConnect';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { ButtonComponent } from './archive/buttonInput/button-component';
import { FrameComponent } from './forms/Frame/frame.component';
import { JmbgComponent } from './archive/jmbgInput/jmbg.component';
import { JmbgForms } from './archive/JmbgForms/jmbgForms';
import { FnameComponent } from './archive/firstNameInput/firstName.component';
import {LnameComponent} from './archive/lastNameInput/lastName.component'
import { LoadService } from './forms/LoadService/loadService.component';
import { BasicDataForms2Component } from './archive/basic-data-forms2/basic-data-forms2.component';
import { EmailInputComponent } from './archive/email-input/email-input.component';
import { PhoneInputComponent } from './archive/phone-input/phone-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { AddressDataForm } from './archive/address-data-forms/address-data-forms.component';
import { TownShipComponent } from './archive/townshipInput/townShip.component';
import { StreetComponent } from './archive/streetInput/street.component';
import { PlaceComponent } from './archive/placeInput/place.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HouseNumberComponent } from './archive/houseNumberInput/houseNumber.component';
import { ApartmanNumberComponent } from './archive/ApartmanNumberInput/apartmanNumber.component';
import { ListBoxComponent } from './archive/customListBox/customListBox.component';
import { DefaultComponent } from './archive/default/default.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { ActionComponent } from './components/action/action.component';
import { CustomListBoxComponent } from './components/custom-list-box/custom-list-box.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { FormsComponent } from './shared/forms/forms.component';
import { PrefilledInputComponent } from './components/prefilled-input/prefilled-input.component';
 
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
    ActionComponent,
    CustomListBoxComponent,
    CustomSelectComponent,
    WelcomeComponent,
    FormsComponent,
    PrefilledInputComponent
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
