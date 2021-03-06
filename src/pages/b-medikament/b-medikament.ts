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

  prevStep(site){
    let pushSite:any;
    console.log(this.fb.patientPageStatus);
    if (site == 'Patient' && this.fb.patientPageStatus == true){
      pushSite = BPatientPage;
      this.navCtrl.push(pushSite);
    } else if (site == 'Medikament' && this.fb.medikamentPageStatus == true){
      pushSite = BMedikamentPage;
      this.navCtrl.push(pushSite);
    } else if (site == 'Dosierung' && this.fb.dosierungPageStatus == true) {
      pushSite = BDosierungPage;
      this.navCtrl.push(pushSite);
    } else if (site == 'Scan' && this.fb.scanPageStatus == true){
      pushSite = BScanPage;
      this.navCtrl.push(pushSite);
    } else if (site == 'Zusammenfassung' && this.fb.zusammenfassungPageStatus == true){
      pushSite = BZusammenfassungPage;
      this.navCtrl.push(pushSite);
    }
  }


}
