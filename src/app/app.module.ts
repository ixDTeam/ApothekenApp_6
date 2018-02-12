import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MultiuserPage } from '../pages/multiuser/multiuser';

import { BMedikamentPage } from '../pages/b-medikament/b-medikament';
import { BDosierungPage } from '../pages/b-dosierung/b-dosierung';
import { BScanPage } from '../pages/b-scan/b-scan';
import { BZusammenfassungPage } from '../pages/b-zusammenfassung/b-zusammenfassung';
import { BPatientPage } from '../pages/b-patient/b-patient';
import { KommendeBestellungenPage } from '../pages/kommende-bestellungen/kommende-bestellungen';

import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb'
import {WaitingComponent} from '../components/waiting/waiting'

import { CalendarModule } from "ion2-calendar";

import {RoundProgressModule} from 'angular-svg-round-progressbar';
import * as moment from 'moment';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from './../providers/firebase/firebase';

const firebaseConfig = {
   apiKey: "AIzaSyDGkzkp6grNHborN8H5xe9Rw_N5X0hQdAo",
   authDomain: "project-fortis.firebaseapp.com",
   databaseURL: "https://project-fortis.firebaseio.com",
   projectId: "project-fortis",
   storageBucket: "project-fortis.appspot.com",
   messagingSenderId: "890235524035"
 };

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ContactPage,
    HomePage,
    TabsPage,
    MultiuserPage,
    BPatientPage,
    BMedikamentPage,
    BScanPage,
    BDosierungPage,
    BZusammenfassungPage,
    KommendeBestellungenPage,
    DetailPage,
    BreadcrumbComponent,
    WaitingComponent
  ],
  imports: [
    BrowserModule,
    RoundProgressModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    CalendarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    ContactPage,
    MultiuserPage,
    HomePage,
    TabsPage,
    KommendeBestellungenPage,
    BPatientPage,
    BMedikamentPage,
    BScanPage,
    BDosierungPage,
    BZusammenfassungPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AngularFireDatabase,
  ]
})
export class AppModule {}
