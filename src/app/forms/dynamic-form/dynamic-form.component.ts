import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CamundaService } from '../../services/camundaConnect';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FrameComponent } from '../frame/frame.component';
import { formResources, buttonResources, textResources } from '../../resources';
import { CustomInputComponent } from '../../ui-components/custom-input/custom-input.component';
import { CheckboxInputComponent } from '../../ui-components/checkbox-input/checkbox-input.component';
import { ActionComponent } from '../../ui-components/action/action.component';
import { CustomListBoxComponent } from '../../ui-components/custom-list-box/custom-list-box.component';
import { CustomSelectComponent } from '../../ui-components/custom-select/custom-select.component';
import { PrefilledInputComponent } from '../../ui-components/prefilled-input/prefilled-input.component';

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
  tooltip: string;
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
  customCheckboxComponentRefs: ComponentRef<CheckboxInputComponent>[] = [];
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

  buttonResources=buttonResources;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private resolver: ComponentFactoryResolver, private camundaService: CamundaService, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private frameComponet: FrameComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (this.globalService.getGlobalTaskKey() == this.id) {
      this.myJSON = JSON.parse(this.globalService.getGlobalTaskJSON());
      this.title = formResources[this.globalService.getGlobalTaskKey()].title;
      this.text = formResources[this.globalService.getGlobalTaskKey()].text;
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
          if (component.prefilled && !component.mandatory)
            this.loadPrefilledInput(component);
          else { this.loadInput(component, inputIndex); inputIndex++; }
          break;
        case 'miniInput': this.loadInput(component, inputIndex); inputIndex++; break;
        case 'checkbox': this.loadCheckBox(component, checkboxIndex); checkboxIndex++; break;
        case 'select': this.loadSelect(component, inputIndex); inputIndex++; break;
        case 'listBox': this.loadListBox(component, inputIndex); inputIndex++; break;
        case 'image': this.loadImage(component.name); break;
        case 'text': this.loadDiv(component.key); break;
        case 'action': this.loadAction(component); break;
      }
    }
  }

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

    if (component.key == 'email') {
      //dohvati pravi parametar
      let mail = "mihajlobondji@gmail.com"
      componentRef.instance.prefilledValue = mail;
    }

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

  tempVal: number = 0;
  loadPrefilledInput(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(PrefilledInputComponent);
    const componentRef = this.container.createComponent(factory);

    //dohvati pravi parametar
    let val = ["Mihajlo", "Bondji", "0905000710310", "48229473"];
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
      componentRef.instance.mandatory = component.mandatory;
      componentRef.instance.key = component.key;
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

  loadDiv(key: string) {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(textResources[key].text);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.container.element.nativeElement, div);
  }

  loadAction(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(ActionComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.key = component.key;
    this.customActionComponentRefs.push(componentRef);
  }

  ngOnDestroy() {
    this.customInputComponentRefs.forEach(ref => {
      ref.destroy();
    });
  }
}
