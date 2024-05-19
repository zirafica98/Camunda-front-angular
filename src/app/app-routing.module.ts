import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { FrameComponent } from './forms/frame/frame.component';
import { JmbgForms } from './archive/JmbgForms/jmbgForms';
import { LoadService } from './forms/loadService/loadService.component';
import { BasicDataForms2Component } from './archive/basic-data-forms2/basic-data-forms2.component';
import { AddressDataForm } from './archive/address-data-forms/address-data-forms.component';
import { DefaultComponent } from './archive/default/default.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { FormsComponent } from './shared/forms/forms.component';



const routes: Routes = [
  { path: 'frame', component: FrameComponent},
  {
    path:'dynamicForm/:id',
    component:DynamicFormComponent
  },
  {
    path:'Service/:id',
    component:LoadService
  },
  {
    path:'AddressForm',
    component:AddressDataForm
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
