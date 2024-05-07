import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../../forms/Frame/frame.component';
import { FormBuilder,FormGroup } from '@angular/forms';
import { formResources } from "../../resources";

@Component({
    selector: 'app-address-data-forms',
    templateUrl: './address-data-forms.component.html',
    styleUrl:'../../forms/style/forms-style.css'
})
export class AddressDataForm {
    codeBook: any = [];
    constructor(private camundaService: CamundaService, private globalService: GlobalService, private router: Router, private frameComponet: FrameComponent) { }
    
    formsResources=formResources;
    ngOnInit() {
        this.codeBook = this.globalService.getGlobalCodeBook();
        //console.log(this.codeBook);
        (document.getElementsByClassName("text-content")[0] as HTMLDivElement).innerHTML=this.formsResources["AddressForm"].text;
    }




    submitForm() {
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
