import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../Frame/frame.component';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
    selector: 'app-address-data-forms',
    templateUrl: './address-data-forms.component.html',
    styleUrl: './address-data-forms.component.css'
})
export class AddressDataForm {
    codeBook: any = [];
    constructor(private camundaService: CamundaService, private globalService: GlobalService, private router: Router, private frameComponet: FrameComponent) { 

    }

    ngOnInit() {
        this.codeBook = this.globalService.getGlobalCodeBook();
        //console.log(this.codeBook);
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
