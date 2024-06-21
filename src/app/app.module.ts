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
import { CheckboxInputComponent } from './ui-components/checkbox-input/checkbox-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './ui-components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { ActionComponent } from './ui-components/action/action.component';
import { CustomListBoxComponent } from './ui-components/custom-list-box/custom-list-box.component';
import { CustomSelectComponent } from './ui-components/custom-select/custom-select.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { PrefilledInputComponent } from './ui-components/prefilled-input/prefilled-input.component';
import { RadioInputComponent } from './ui-components/radio-input/radio-input.component';
import { PopupComponent } from './shared/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipDirective } from './shared/tooltip/tooltip.directive';
import { ErrorComponent } from './shared/error/error.component';
import { LoadServiceComponent } from './forms/load-service/load-service.component';
import { DocumentComponent } from './ui-components/document/document.component';
import { TextComponent } from './ui-components/text/text.component';
import { ButtonComponent } from './ui-components/button/button.component';
 
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
    PrefilledInputComponent,
    RadioInputComponent,
    PopupComponent,
    TooltipDirective,
    ErrorComponent,
    LoadServiceComponent,
    DocumentComponent,
    TextComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [CamundaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
