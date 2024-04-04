import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { FrameComponent } from './forms/Frame/frame.component';
import { JmbgForms } from './forms/JmbgForms/jmbgForms';
import { BasicDataFormsComponent } from './forms/BasicDataForms/basicDataForms';
import { LoadService } from './forms/LoadService/loadService.component';


const routes: Routes = [
  { path: '', component: StartCamundaComponent },
  { path: 'frame', component: FrameComponent,  children:[
    {path:'Form1/:id',
      component: JmbgForms
    },
    {
      path:'Servis1/:id',
      component:LoadService
    },
    {path:'Form2/:id',
      component: BasicDataFormsComponent
    }
  ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
