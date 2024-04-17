import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { CamundaService } from '../../service/camundaConnect';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'frame-component',
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  showJmbgForms: boolean = false;
  showCodeBookForm: boolean = false;
  constructor(private globalService: GlobalService, private camundaService: CamundaService, private router: Router) { }

  ngOnInit() {
    this.toggleComponent();
  }

  toggleComponent() {
    if (this.globalService.isDev()) {
      this.camundaService.getActiveTask()
        .subscribe(
          response => {
            //console.log(response);
            if (response[0]) {
              this.globalService.setGlobalTaskKey(response[0].formKey);
              this.globalService.setGlobalTaskId(response[0].id);
              this.globalService.setGlobalTaskJSON(response[0].description);

              if (response[0].formKey.includes('Form')) {
                if(response[0].description!=""&&response[0].description!=null)
                  this.router.navigateByUrl(`dynamicForm/${response[0].formKey}`);
                else this.router.navigateByUrl(`${response[0].formKey}`);
              }
              else
                this.router.navigateByUrl(`Service/${response[0].formKey}`);
            }
          }
        )
    }
    else
      this.router.navigate(['/frame/AddressForm']);
  }
}
