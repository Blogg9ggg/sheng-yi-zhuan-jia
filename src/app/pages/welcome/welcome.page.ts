import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
export const APP_KEY: string = 'App'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

  constructor(private localStorageService:LocalStorageService, private router: Router) { }
  showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  ngOnInit() {
    let appConfig: any = this.localStorageService.get('App', {
      isLaunched: false,
      version: '1.0.0'
    })
    if ( appConfig.isLaunched === false ) {
      appConfig.isLaunched = true;
      this.localStorageService.set('App', appConfig);
    } else {
      this.router.navigateByUrl('home');
    }
  }
  onSlideWillChange(event) {
    console.log(event);
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    })
  }
}
