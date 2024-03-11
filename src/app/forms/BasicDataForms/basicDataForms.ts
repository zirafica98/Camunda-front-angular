import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CamundaService } from "../../service/camundaConnect";
import { GlobalService } from "../../global.service";


@Component({
    selector:'basic-data-forms',
    templateUrl:'./basicDataForms.html'
})

export class BasicDataFormsComponent{
    idTask = "";
    formData = {
        inputData: 'test'
      };
    constructor(private camundaService: CamundaService,private globalSerive:GlobalService) { }

    ngOnInit() {
        const form = document.getElementById('myForm') as HTMLFormElement;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitForm();
        });
    }

    submitForm() {
      this.idTask = this.globalSerive.getGlobalTaskId()[0].id;
      this.camundaService.executeServiceTask(this.idTask)
        .subscribe(
          response => {
            this.camundaService.getVariableAfterTask(this.globalSerive.getGlobalVariable())
              .subscribe(
                response => {
                  console.log("Vrednost:",response);
                },
                error =>{
                  console.log("Error",error);
                }
              )
          },
          error => {
            console.log("Failed to complete task:",error)
          }
        )
    }

}
