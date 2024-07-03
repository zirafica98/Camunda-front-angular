import { ChangeDetectorRef, Component, ComponentFactoryResolver, Renderer2, ViewChild, ViewContainerRef } from "@angular/core";
import { CamundaService } from "../../services/camundaConnect";
import { DataLoader } from "../../services/dataLoader";
import { GlobalService } from "../../global.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FrameComponent } from "../frame/frame.component";
import { serviceResources, textResources } from "../../resources";
import { ComponentData, MyJSON } from "../dynamic-form/dynamic-form.component";
import { TextComponent } from "../../ui-components/text/text.component";
import { ImageComponent } from "../../ui-components/image/image.component";


@Component({
  selector: 'load-service',
  templateUrl: './load-service.component.html',
  styleUrl: '../style/forms-style.css',
})

export class LoadServiceComponent {
  id: string = "";
  constructor(private renderer: Renderer2, private camundaService: CamundaService, private cdr: ChangeDetectorRef, private resolver: ComponentFactoryResolver, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private frameComponet: FrameComponent, private dataLoader: DataLoader) { }

  @ViewChild('inputContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  title: string = "";
  subtitle: string = "";
  text: string = "";
  loadingText: string = "";
  taskKey: string = "";
  myJSON: MyJSON = { components: [], customClass: "" };

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (this.globalService.getGlobalTaskKey() == this.id) {
      this.myJSON = JSON.parse(this.globalService.getGlobalTaskJSON());
      this.taskKey = this.globalService.getGlobalTaskKey();
      this.title = serviceResources[this.taskKey].title;
      this.globalService.setSubtitle(serviceResources[this.globalService.getGlobalTaskKey()].title);

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
        case 'OfferService':
          setTimeout(() => {
            this.servis2();
          }, 2000);
          break;
      }
    }
    else alert("nedozvoljen pristup");
  }

  ngAfterViewInit(): void {
    this.loadElements();
    this.cdr.detectChanges();
  }

  loadElements() {

    for (let [index, component] of this.myJSON.components.entries()) {

      switch (component.type) {
        case 'image': this.loadImage(component); break;
        case 'text': this.loadText(component.key, component.class); break;
      }
    }
  }

  loadImage(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(ImageComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.src = component.name;
    componentRef.instance.className = component.key;
  }

  loadText(key: string, className: string) {
    const factory = this.resolver.resolveComponentFactory(TextComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.text = textResources[key].text;
    componentRef.instance.className = className;
  }

  getCodeBook() {
    this.dataLoader.getCodeBook()
      .subscribe(
        response => {
          this.globalService.setGlobalCodeBook(response);
          this.camundaService.completeTask()
            .subscribe(
              response => {
                this.router.navigate(['/frame']).then(() => {
                  this.frameComponet.toggleComponent();
                });
              }
            )
        }
      )
  }

  servis2() {
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
