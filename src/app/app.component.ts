import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from './global.service';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(WelcomeComponent) welcomeComponent: WelcomeComponent | undefined;
  title = 'Oročena štednja';
  constructor(private router: Router, private route: ActivatedRoute, private globalService: GlobalService) { }

  ok: number = 0;
  ngOnInit(): void {
    let p = this.globalService.getParams();
    if (p.length == 0) 
      this.route.queryParams.subscribe(params => {
        const param1 = parseInt(params['PrincipalID']);
        const param2 = parseInt(params['SessionID']);
        const param3 = parseInt(params['ChannelID']);
        if (!isNaN(param1) && !isNaN(param2) && !isNaN(param3)){
          this.globalService.setParams(param1, param2, param3);
          this.removeParamsFromUrl();
          this.ok = 1;
        }
      });

  }

  removeParamsFromUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    })
  }

  startCamunda(){
    this.ok=2;
  }
}
