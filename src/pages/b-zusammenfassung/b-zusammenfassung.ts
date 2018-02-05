import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable'

import { HomePage } from '../home/home';
import { BPatientPage } from '../b-patient/b-patient';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BScanPage } from '../b-scan/b-scan';

/**
 * Generated class for the BZusammenfassungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-zusammenfassung',
  templateUrl: 'b-zusammenfassung.html',
})
export class BZusammenfassungPage {

box:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {
    this.box = fb.ordersStore;
    this.fb.newOrderToArray();
  }


editToArray(index){
  // Eher Fake derzeit. Kann besser!
  this.fb.ordersStore.splice(index, 1);
  this.navCtrl.push(BMedikamentPage);
}

deleteToArray(index){
  this.fb.ordersStore.splice(index, 1);
}

startNewOrderToArray(){
  this.fb.patientPageStatus = true;
  this.fb.medikamentPageStatus = false;
  this.fb.dosierungPageStatus = false;
  this.fb.scanPageStatus = false;
  this.fb.zusammenfassungPageStatus = false;
  this.navCtrl.push(BMedikamentPage);
}

newOrderToFirebase(){
  this.fb.newOrderToFirebase();
  this.fb.clearOrderArray();
  this.navCtrl.push(HomePage);
}

prevStep(site){
  let pushSite:any;
  console.log(this.fb.dosierungPageStatus)
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
