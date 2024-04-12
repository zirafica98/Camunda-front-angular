import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CamundaService } from "../../service/camundaConnect";
import { GlobalService } from "../../global.service";
import { Router } from "@angular/router";
import { FrameComponent } from "../Frame/frame.component";


@Component({
  selector: 'jmbg-forms',
  templateUrl: './jmbgForms.html',
  styleUrl:'../style/forms-style.css'
})

export class JmbgForms {
  idTask = "";
  formData = {
    inputData: 'test'
  };

  isChecked: boolean = false;
  constructor(private camundaService: CamundaService, private globalSerive: GlobalService, private router: Router, private frameComponet: FrameComponent) { }


  ngOnInit() {
  }

  inputValue: string="";
  formIsValid: boolean=false;

  handleFormValidity(isValid: boolean) {
    this.formIsValid = isValid;
    console.log(this.formIsValid);
  }

  submitForm() {
    if (this.isChecked&&this.formIsValid) {
      this.camundaService.completeTask()
        .subscribe(
          response => {
            this.router.navigate(['/frame']).then(() => {
              this.frameComponet.toggleComponent();
            });
          }
        )
    }
  }

}
