import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/switchMap';

import { BPatientPage } from '../b-patient/b-patient';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { BScanPage } from '../b-scan/b-scan';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';

import { Observable } from 'rxjs/Observable'


@IonicPage()
@Component({
  selector: 'page-b-medikament',
  templateUrl: 'b-medikament.html',
})
export class BMedikamentPage {


  private drugsVar:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider, public loadingCtrl: LoadingController ) {
  }

  ngOnInit(){
    this.fb.getDrugs("").snapshotChanges().subscribe(changes => this.drugsVar = changes);
  }

  searchEvent(searchInput){
    searchInput = searchInput.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    this.fb.getDrugs(searchInput).snapshotChanges().subscribe(changes => this.drugsVar = changes);
  }


  nextStep(medikament){
    this.fb.dosierungPageStatus = true;
    this.fb.medikament = medikament;
    this.navCtrl.push(BDosierungPage);
  }



}
