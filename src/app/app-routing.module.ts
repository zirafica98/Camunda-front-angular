import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './forms/frame/frame.component';
import { LoadServiceComponent } from './forms/load-service/load-service.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';



const routes: Routes = [
  { path: 'frame', component: FrameComponent},
  {
    path:'dynamicForm/:id',
    component:DynamicFormComponent
  },
  {
    path:'Service/:id',
    component:LoadServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
