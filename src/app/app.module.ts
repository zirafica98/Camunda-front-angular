import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { StepsWrapComponent } from './shared/stepWrapper/stepWrapper';
import { CamundaService } from './services/camundaConnect';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { FrameComponent } from './forms/frame/frame.component';
import { LoadService } from './forms/loadService/loadService.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    StepsWrapComponent,
    StartCamundaComponent,
    FrameComponent,
    CheckboxInputComponent,
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
