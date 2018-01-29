import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { BScanPage } from '../b-scan/b-scan';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-b-patient',
  templateUrl: 'b-patient.html',
})
export class BPatientPage {


  private patientID:any;
  highlightColor:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider) {

  }


  nextStep(){
    this.fb.setPatintenID(this.patientID);
    this.navCtrl.push(BMedikamentPage);
    this.fb.medikamentPageStatus = true;
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
