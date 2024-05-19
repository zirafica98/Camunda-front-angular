import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { FrameComponent } from './forms/frame/frame.component';
import { LoadService } from './forms/loadService/loadService.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
