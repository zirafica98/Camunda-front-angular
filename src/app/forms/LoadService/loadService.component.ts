import { Component } from "@angular/core";
import { CamundaService } from "../../services/camundaConnect";
import { DataLoader } from "../../services/dataLoader";
import { GlobalService } from "../../global.service";
import { ActivatedRoute,  Router } from "@angular/router";
import { FrameComponent } from "../frame/frame.component";
import { formResources } from "../../resources";


@Component({
    selector:'load-service',
    templateUrl:'./loadService.component.html',
    styleUrl:'../style/forms-style.css',
})

export class LoadService{
    id:string = "";
    constructor(private camundaService: CamundaService,private globalService:GlobalService, private router:Router,private route:ActivatedRoute,private frameComponet:FrameComponent,private dataLoader:DataLoader) { }

    text: string = "";
    title: string = "";

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get("id") || "";
      
      this.title = formResources[this.globalService.getGlobalTaskKey()].title;
      this.text = formResources[this.globalService.getGlobalTaskKey()].text;

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
    }

    getCodeBook() {
        this.dataLoader.getCodeBook()
        .subscribe(
          response => {
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
