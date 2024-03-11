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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasicDataFormsComponent,
    TextInputComponent,
    StepsWrapComponent,
    StartCamundaComponent,
    ButtonComponent
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
