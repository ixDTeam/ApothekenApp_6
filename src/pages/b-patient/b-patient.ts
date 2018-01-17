import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-b-patient',
  templateUrl: 'b-patient.html',
})
export class BPatientPage {

  private patientID:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider) {
  }

  nextStep(){
    this.fb.setPatintenID(this.patientID);
    this.navCtrl.push(BMedikamentPage);
  }
}
