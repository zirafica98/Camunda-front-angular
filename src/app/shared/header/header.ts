import { Component } from "@angular/core";

@Component({
    selector: 'header-component',
    templateUrl: './header.html',
    styleUrl:'./header.css'
  })
  export class HeaderComponent {

      openLink() {
        window.open('https://www.raiffeisenbank.rs/', '_blank');
      }
  }
