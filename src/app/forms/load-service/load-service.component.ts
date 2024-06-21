import { Component } from "@angular/core";
import { CamundaService } from "../../services/camundaConnect";
import { DataLoader } from "../../services/dataLoader";
import { GlobalService } from "../../global.service";
import { ActivatedRoute,  Router } from "@angular/router";
import { FrameComponent } from "../frame/frame.component";
import { serviceResources } from "../../resources";


@Component({
    selector:'load-service',
    templateUrl:'./load-service.component.html',
    styleUrl:'../style/forms-style.css',
})

export class LoadServiceComponent{
    id:string = "";
    constructor(private camundaService: CamundaService,private globalService:GlobalService, private router:Router,private route:ActivatedRoute,private frameComponet:FrameComponent,private dataLoader:DataLoader) { }

    title: string = "";
    subtitle: string = "";
    text: string = "";
    loadingText: string = "";
    taskKey:string="";

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get("id") || "";
      this.taskKey=this.globalService.getGlobalTaskKey();
      this.title = serviceResources[this.taskKey].title;
      this.subtitle = serviceResources[this.taskKey].subtitle;
      this.text = serviceResources[this.taskKey].text;
      this.loadingText = serviceResources[this.taskKey].loadingText;

      switch (this.id) {
        case 'CodeBookService':
          setTimeout(() => {
            this.getCodeBook();
          }, 0); //staviti na 100000 za uredjivanje loadComponente
          break;
        case 'PreConditionalService':
          setTimeout(() => {
          this.servis2();
        }, 2000);
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
        console.log("Test Servis");
    }
}
