import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { FrameComponent } from '../Frame/frame.component';
import { formResources } from '../../resources';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { CheckboxInputComponent } from '../../components/checkbox-input/checkbox-input.component';
import { CheckBoxComponent } from '../../archive/checkBoxInput/checkBoxInput.component';
import { ActionComponent } from '../../components/action/action.component';
import { CustomListBoxComponent } from '../../components/custom-list-box/custom-list-box.component';
import { CustomSelectComponent } from '../../components/custom-select/custom-select.component';
import { PrefilledInputComponent } from '../../components/prefilled-input/prefilled-input.component';

interface ComponentData {
  type: string;
  key: string;
  link: string;
  text: string;
  actionText: string;
  mandatory: boolean;
  name: string;
  options: string[];
  placeholder: string;
  prefilled: boolean;
}

interface MyJSON {
  components: ComponentData[];
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: '../style/forms-style.css'
})
export class DynamicFormComponent {

  @ViewChild('inputContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  customInputComponentRefs: ComponentRef<CustomInputComponent>[] = [];
  customSelectComponentRefs: ComponentRef<CustomSelectComponent>[] = [];
  customListBoxComponentRefs: ComponentRef<CustomListBoxComponent>[] = [];
  customCheckboxComponentRefs: ComponentRef<CheckBoxComponent>[] = [];
  customPrefilledInputComponentRefs: ComponentRef<PrefilledInputComponent>[] = [];
  customActionComponentRefs: ComponentRef<ActionComponent>[] = [];

  id: string = "";
  myJSON: MyJSON = { components: [] };
  text: string = "";
  title: string = "";
  formIsValid: boolean[] = [];
  isChecked: boolean[] = [];
  myInputComponents: ComponentData[] = [];
  myCheckboxComponents: ComponentData[] = [];
  myPrefilledInputComponents: ComponentData[] = [];
  areMandatorySelected: boolean = true;
  codeBook: any = [];
  numMini: number = 0;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private resolver: ComponentFactoryResolver, private camundaService: CamundaService, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private frameComponet: FrameComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (this.globalService.getGlobalTaskKey() == this.id) {
      this.myJSON = JSON.parse(this.globalService.getGlobalTaskJSON());
      this.title = this.formsResources[this.globalService.getGlobalTaskKey()].title;
      this.text = this.formsResources[this.globalService.getGlobalTaskKey()].text;
      (document.getElementsByClassName("text-content")[0] as HTMLDivElement).innerHTML = this.text;
      switch (this.id) {
        case "AddressForm": this.codeBook = this.globalService.getGlobalCodeBook();
      }
    }
    else alert("nedozvoljen pristup");
  }

  ngAfterViewInit(): void {
    this.loadCustomInputs();
    this.cdr.detectChanges();
  }

  loadCustomInputs() {
    let inputIndex = 0;
    let checkboxIndex = 0;
    for (let [index, component] of this.myJSON.components.entries()) {

      switch (component.type) {
        case 'input':
          if (component.prefilled)
            this.loadPrefilledInput(component);
          else
            {this.loadInput(component, inputIndex); inputIndex++;}
          break;
        case 'miniInput': this.loadInput(component, inputIndex); inputIndex++; break;
        case 'checkbox': this.loadCheckBox(component, checkboxIndex); checkboxIndex++; break;
        case 'select': this.loadSelect(component, inputIndex); inputIndex++; break;
        case 'listBox': this.loadListBox(component, inputIndex); inputIndex++; break;
        case 'image': this.loadImage(component.name); break;
        case 'text': this.loadDiv(component.text); break;
        case 'action': this.loadAction(component); break;
      }
    }
  }

  ngOnDestroy() {
    this.customInputComponentRefs.forEach(ref => {
      ref.destroy();
    });
  }

  formsResources = formResources;


  handleFormValidity(isValid: boolean, index: number) {
    this.formIsValid[index] = isValid;
  }

  areAllInputsValid(): boolean {
    return this.customInputComponentRefs.every(ref => ref.instance.isValid());
  }

  submitForm() {
    if (this.areAllInputElementsValid() && this.areAllCheckboxElementsValid()) {
      this.camundaService.completeTask()
        .subscribe(
          response => {
            this.router.navigate(['/frame']).then(() => {
              this.frameComponet.toggleComponent();
            });
          }
        )
    }
    else {
      this.customInputComponentRefs.forEach(ref => {
        if (!ref.instance.isValid()) {
          ref.instance.input?.markAsTouched();
        }
      });
      this.customSelectComponentRefs.forEach(ref => {
        if (!ref.instance.isValid()) {
          ref.instance.input?.markAsTouched();
        }
      });
      this.customListBoxComponentRefs.forEach(ref => {
        if (!ref.instance.isValid()) {
          ref.instance.input?.markAsTouched();
        }
      });
    }
  }

  areAllInputElementsValid(): boolean {
    for (let i = 0; i < this.myInputComponents.length; i++) {
      if ((this.myInputComponents[i].type === 'input' || this.myInputComponents[i].type === 'miniInput' || this.myInputComponents[i].type === 'listBox' || this.myInputComponents[i].type === 'select') && !this.formIsValid[i]) {
        return false;
      }
    }
    return true;
  }


  areAllCheckboxElementsValid(): boolean {
    for (let i = 0; i < this.myCheckboxComponents.length; i++) {
      if (this.myCheckboxComponents[i].type === 'checkbox' && !this.isChecked[i] && this.myCheckboxComponents[i].mandatory == true) {
        this.areMandatorySelected = false;
        return false;
      }
    }
    this.areMandatorySelected = true;
    return true;
  }

  loadInput(component: ComponentData, checkboxIndex: number) {
    const factory = this.resolver.resolveComponentFactory(CustomInputComponent);
    const componentRef = this.container.createComponent(factory);
    const currentIndex = checkboxIndex;
    componentRef.instance.customType = component.key;
    componentRef.instance.mandatory = component.mandatory;
    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customInputComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);

    if (component.type == "miniInput") {
      this.numMini++;
      this.renderer.setStyle(componentRef.location.nativeElement, 'display', 'inline-block');
      this.renderer.setStyle(componentRef.location.nativeElement, 'width', 'calc(50% - 40px)');
      if (this.numMini % 2 == 0)
        this.renderer.setStyle(componentRef.location.nativeElement, 'margin-left', '80px');
    }
  }

  tempVal:number=0;
  loadPrefilledInput(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(PrefilledInputComponent);
    const componentRef = this.container.createComponent(factory);

    //dohvati pravi parametar
    let val=["Mihajlo","Bondji","648229473","mihajlobondji@gmail.com"];
    componentRef.instance.customType = component.key;
    componentRef.instance.value = val[this.tempVal];
    this.myPrefilledInputComponents.push(component);
    this.tempVal++;
  }

  loadCheckBox(component: ComponentData, checkboxIndex: number) {
    {
      const factory = this.resolver.resolveComponentFactory(CheckboxInputComponent);
      const componentRef = this.container.createComponent(factory);
      const currentIndex = checkboxIndex;
      this.isChecked.push(false);
      componentRef.instance.customText = component.text;
      componentRef.instance.mandatory = component.mandatory;
      componentRef.instance.link = component.link;
      componentRef.instance.isChecked = this.isChecked[checkboxIndex];
      componentRef.instance.isCheckedChange.subscribe((isChecked: boolean) => {
        this.isChecked[currentIndex] = isChecked;
      });
      this.customCheckboxComponentRefs.push(componentRef);
      this.myCheckboxComponents.push(component);
    }
  }

  loadListBox(component: ComponentData, listBoxIndex: number) {
    const factory = this.resolver.resolveComponentFactory(CustomListBoxComponent);
    const componentRef = this.container.createComponent(factory);
    const currentIndex = listBoxIndex;
    componentRef.instance.customType = component.key;
    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customListBoxComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);
  }

  loadSelect(component: ComponentData, selectIndex: number) {
    const factory = this.resolver.resolveComponentFactory(CustomSelectComponent);
    const componentRef = this.container.createComponent(factory);
    const currentIndex = selectIndex;
    componentRef.instance.customType = component.key;
    componentRef.instance.options = component.options;
    componentRef.instance.placeholder = component.placeholder;
    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customSelectComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);
  }

  loadImage(src: string) {
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', 'assets/images/' + src);
    this.renderer.appendChild(this.container.element.nativeElement, img);
  }

  loadDiv(textToShow: string) {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(textToShow);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.container.element.nativeElement, div);
  }

  loadAction(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(ActionComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.text = component.text;
    componentRef.instance.actionText = component.actionText;
    componentRef.instance.key = component.key;
    this.customActionComponentRefs.push(componentRef);
  }

  onClickMethod() {
    console.log("click");
  }
}
