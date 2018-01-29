import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import 'rxjs/add/operator/take'

import { BPatientPage } from '../b-patient/b-patient';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';


@IonicPage()
@Component({
  selector: 'page-b-scan',
  templateUrl: 'b-scan.html',
})
export class BScanPage {

prevScannerValue:any;
scannerValue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider)
  {
    fb.scannerRef.valueChanges().subscribe(changes => this.scannerValue);
    // fb.scannerRef.valueChanges().subscribe( changes =>
    //   this.nextStep()
    // );
    this.fb.db.object('Scanner/Devices/'+this.fb.getScannerID()).valueChanges().subscribe((value) => {
        this.fb.BoxID = value;
    });
  }


nextStep(){
  this.fb.zusammenfassungPageStatus = true;
  if (this.prevScannerValue == this.scannerValue){
    this.navCtrl.push(BZusammenfassungPage);
  }
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
