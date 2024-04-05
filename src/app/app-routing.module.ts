import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { FrameComponent } from './forms/Frame/frame.component';
import { JmbgForms } from './forms/JmbgForms/jmbgForms';
import { BasicDataFormsComponent } from './forms/BasicDataForms/basicDataForms';
import { LoadService } from './forms/LoadService/loadService.component';
import { BasicDataForms2Component } from './forms/basic-data-forms2/basic-data-forms2.component';


const routes: Routes = [
  { path: '', component: StartCamundaComponent },
  { path: 'frame', component: FrameComponent,  children:[
    {path:'Form1/:id',
      component: BasicDataForms2Component
    },
    {
      path:'Servis1/:id',
      component:LoadService
    },
    {path:'Form2/:id',
      component: JmbgForms
    }
  ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
