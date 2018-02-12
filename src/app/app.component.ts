import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { BPatientPage } from '../pages/b-patient/b-patient';
import { BDosierungPage } from '../pages/b-dosierung/b-dosierung';
import { BScanPage } from '../pages/b-scan/b-scan';
import { BMedikamentPage } from '../pages/b-medikament/b-medikament';
import { BZusammenfassungPage } from '../pages/b-zusammenfassung/b-zusammenfassung';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
