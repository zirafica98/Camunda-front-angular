import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CamundaService } from "../../service/camundaConnect";
import { DataLoader } from "../../service/dataLoader";
import { GlobalService } from "../../global.service";
import { ActivatedRoute,  Router } from "@angular/router";
import { FrameComponent } from "../Frame/frame.component";


@Component({
    selector:'load-service',
    templateUrl:'./loadService.component.html',
    styleUrl:'../style/forms-style.css',
})

export class LoadService{
    id:string = "";
    constructor(private camundaService: CamundaService,private globalService:GlobalService, private router:Router,private route:ActivatedRoute,private frameComponet:FrameComponent,private dataLoader:DataLoader) { }

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get("id") || "";

      switch (this.id) {
        case 'CodeBookService':
          setTimeout(() => {
            this.getCodeBook();
          }, 0); //staviti na 100000 za uredjivanje loadComponente
          break;
        case 'Servis2':
          this.servis2();
          break;
      }
    //

    }

    getCodeBook() {
        this.dataLoader.getCodeBook()
        .subscribe(
          response => {
            //console.log(response);
            this.globalService.setGlobalCodeBook(response);
            this.camundaService.completeTask()
            .subscribe(
              response => {
                this.router.navigate(['/frame']).then(()=>{
                  this.frameComponet.toggleComponent();
                });
              }
            )
          }
        )
    }

    servis2(){

    }

}
