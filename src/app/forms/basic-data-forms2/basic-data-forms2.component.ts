import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../Frame/frame.component';
import { formResources } from "../../resources";

@Component({
  selector: 'app-basic-data-forms2',
  templateUrl: './basic-data-forms2.component.html',
  styleUrl: '../style/forms-style.css'
})
export class BasicDataForms2Component {

  ngOnInit(){
    (document.getElementsByClassName("text-content")[0] as HTMLDivElement).innerHTML=this.formsResources["BasicDataForm"].text;
  }

  constructor(private camundaService: CamundaService, private globalSerive: GlobalService, private router: Router, private frameComponet: FrameComponent) { }

  formsResources=formResources;
  isChecked: boolean = false;
  isChecked2: boolean = false;

  formIsValid: boolean[] = Array(4).fill(false);

  handleFormValidity(isValid: boolean, index: number) {
    this.formIsValid[index] = isValid;
    console.log(this.formIsValid);
  }

  submitForm() {
    if (this.formIsValid.every(element => element === true)) {
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
