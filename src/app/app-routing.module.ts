import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './forms/frame/frame.component';
import { LoadService } from './forms/loadService/loadService.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';



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
