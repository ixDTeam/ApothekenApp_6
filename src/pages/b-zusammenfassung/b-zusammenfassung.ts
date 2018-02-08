import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider, public alertCtrl: AlertController) {
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
  this.resetProgess();
  this.navCtrl.push(BPatientPage);
}

resetProgess(){
  this.fb.patientPageStatus = true;
  this.fb.medikamentPageStatus = false;
  this.fb.dosierungPageStatus = false;
  this.fb.scanPageStatus = false;
  this.fb.zusammenfassungPageStatus = false;
}

newOrderToFirebaseConfirm(){
  let alert = this.alertCtrl.create({
      title: 'Bestellung bestätigen',
      message: 'Möchten Sie diese Bestellung abschließen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bestellen',
          handler: () => {
            this.newOrderToFirebase();
          }
        }
      ]
    });
    alert.present();
}

newOrderToFirebase(){
  this.fb.newOrderToFirebase();
  this.resetProgess();
  // this.navCtrl.removeView(HomePage);
  this.navCtrl.goToRoot();
}

}
