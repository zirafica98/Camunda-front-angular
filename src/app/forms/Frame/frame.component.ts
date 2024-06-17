import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { CamundaService } from '../../services/camundaConnect';
import { Router } from '@angular/router';
@Component({
  selector: 'frame-component',
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnInit{
  constructor(private globalService: GlobalService, private camundaService: CamundaService, private router: Router) { }

  ngOnInit() {
    this.toggleComponent();
  }

  toggleComponent() {
    this.camundaService.getActiveTask()
      .subscribe(
        response => {
          if (response) {
            this.globalService.setGlobalTaskKey(response.formKey);
            this.globalService.setGlobalTaskId(response.id);
            this.globalService.setGlobalTaskJSON(response.description);

            if (response.formKey.includes('Form')) {
              if (response.description != "" && response.description != null)
                this.router.navigateByUrl(`dynamicForm/${response.formKey}`);
              else this.router.navigateByUrl(`${response.formKey}`);
            }
            else
              this.router.navigateByUrl(`Service/${response.formKey}`);
          }
        }
      )
  }
}
