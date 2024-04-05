import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicDataFormsComponent } from './forms/BasicDataForms/basicDataForms';
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
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasicDataFormsComponent,
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
    CheckboxInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CamundaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
