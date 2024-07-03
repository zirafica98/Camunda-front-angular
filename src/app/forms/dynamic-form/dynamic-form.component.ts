import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
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
import { DocumentComponent } from '../../ui-components/document/document.component';
import { TextComponent } from '../../ui-components/text/text.component';
import { FormButtonComponent } from '../../ui-components/form-button/form-button.component';
import { RadioInputComponent } from '../../ui-components/radio-input/radio-input.component';

export interface ComponentData {
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
  class:string;
}

export interface MyJSON {
  components: ComponentData[];
  customClass:string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: '../style/forms-style.css'
})
export class DynamicFormComponent implements OnInit, AfterViewInit{

  @ViewChild('inputContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  customInputComponentRefs: ComponentRef<CustomInputComponent>[] = [];
  customSelectComponentRefs: ComponentRef<CustomSelectComponent>[] = [];
  customRadioComponentRefs: ComponentRef<RadioInputComponent>[] = [];
  customListBoxComponentRefs: ComponentRef<CustomListBoxComponent>[] = [];
  customCheckboxComponentRefs: ComponentRef<CheckboxInputComponent>[] = [];
  customPrefilledInputComponentRefs: ComponentRef<PrefilledInputComponent>[] = [];
  customActionComponentRefs: ComponentRef<ActionComponent>[] = [];
  customTextComponentRefs: ComponentRef<TextComponent>[] = [];
  customDocumentComponentRefs: ComponentRef<DocumentComponent>[] = [];
  customFormButtonComponentRefs: ComponentRef<FormButtonComponent>[] = [];

  id: string = "";
  myJSON: MyJSON = { components: [], customClass:""};
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
  buttonKey: string = "";
  buttonKeyBack: string = "";
  customClass:string="";

  buttonResources = buttonResources;
  textResources = textResources;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private resolver: ComponentFactoryResolver, private camundaService: CamundaService, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private frameComponet: FrameComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    if (this.globalService.getGlobalTaskKey() == this.id) {
      this.myJSON = JSON.parse(this.globalService.getGlobalTaskJSON());
      this.title = formResources[this.globalService.getGlobalTaskKey()].title;
      this.globalService.setSubtitle(formResources[this.globalService.getGlobalTaskKey()].title);
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

    if(this.myJSON.customClass!=null&&this.myJSON.customClass!=undefined&&this.myJSON.customClass!="")
      this.customClass=this.myJSON.customClass;

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
        case 'radio': this.loadRadio(component); break;
        case 'listBox': this.loadListBox(component, inputIndex); inputIndex++; break;
        case 'image': this.loadImage(component.name); break;
        case 'text': this.loadText(component.key,component.class); break;
        case 'action': this.loadAction(component); break;
        case 'document': this.loadDocument(component.key); break;
        case 'formButton': this.loadFormButton(component.key); break;
        case 'button': if (component.key != "back") this.buttonKey = component.key; else this.buttonKeyBack = component.key; break;
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
              //this.frameComponet.toggleComponent();
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
      const invalidElement = document.getElementsByClassName("ng-invalid")[0];
      if (invalidElement) {
        const parentElement = invalidElement.parentElement;
        if (parentElement) {
          parentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
      }
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
    componentRef.instance.key = component.key;
    componentRef.instance.mandatory = component.mandatory;

    if (component.key == 'email') {
      //dohvati pravi parametar
      let mail = "test@gmail.com"
      componentRef.instance.prefilledValue = mail;
    }

    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customInputComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);

    if (component.type == "miniInput") {
      this.numMini++;
      this.renderer.addClass(componentRef.location.nativeElement, "miniInput");
      if (this.numMini % 2 == 0)
        this.renderer.addClass(componentRef.location.nativeElement, "miniInput2");
    }
  }

  tempVal: number = 0;
  loadPrefilledInput(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(PrefilledInputComponent);
    const componentRef = this.container.createComponent(factory);

    //begin mock -- dohvatiti pravi parametar

    let val;
    if(this.id=="DataMatchForm")
      val = ["1339437177", "21.03.2025.", "Ruzveltova 1", "Beograd - Zvezdara"];
    else
      val = ["Petar", "Petrovic", "0905000710310", "41234567"];

    //end mock

    componentRef.instance.key = component.key;
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
    componentRef.instance.key = component.key;
    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customListBoxComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);
  }

  loadSelect(component: ComponentData, selectIndex: number) {
    const factory = this.resolver.resolveComponentFactory(CustomSelectComponent);
    const componentRef = this.container.createComponent(factory);
    const currentIndex = selectIndex;
    componentRef.instance.key = component.key;
    componentRef.instance.formValidityChange.subscribe((event) => this.handleFormValidity(event, currentIndex));
    this.customSelectComponentRefs.push(componentRef);
    this.formIsValid.push(false);
    this.myInputComponents.push(component);
  }

  loadRadio(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(RadioInputComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.key = component.key;
    this.customRadioComponentRefs.push(componentRef);
    this.myInputComponents.push(component);
  }

  loadImage(src: string) {
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', 'assets/images/' + src);
    this.renderer.appendChild(this.container.element.nativeElement, img);
  }

  loadText(key: string, className:string) {
    const factory = this.resolver.resolveComponentFactory(TextComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.text = textResources[key].text;
    componentRef.instance.className = className;
    this.customTextComponentRefs.push(componentRef);
  }

  loadAction(component: ComponentData) {
    const factory = this.resolver.resolveComponentFactory(ActionComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.key = component.key;
    this.customActionComponentRefs.push(componentRef);
  }

  loadDocument(key: string) {
    const factory = this.resolver.resolveComponentFactory(DocumentComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.key = key;
    this.customDocumentComponentRefs.push(componentRef);
  }

  loadFormButton(key: string) {
    const factory = this.resolver.resolveComponentFactory(FormButtonComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.text = buttonResources[key].text;
    this.customFormButtonComponentRefs.push(componentRef);
  }

  ngOnDestroy() {
    this.customInputComponentRefs.forEach(ref => {
      ref.destroy();
    });
  }
}
