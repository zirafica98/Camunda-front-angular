import { Component,OnInit  } from '@angular/core';
import { GlobalService } from './global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'camunda-front';
  constructor() { }
}
