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
    showBasicDataForm:boolean = false;
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
      
    }

}
