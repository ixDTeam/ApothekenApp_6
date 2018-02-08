import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BPatientPage } from '../../pages/b-patient/b-patient';
import { BMedikamentPage } from '../../pages/b-medikament/b-medikament';
import { BDosierungPage } from '../../pages/b-dosierung/b-dosierung';
import { BScanPage } from '../../pages/b-scan/b-scan';
import { BZusammenfassungPage } from '../../pages/b-zusammenfassung/b-zusammenfassung';

/**
 * Generated class for the BreadcrumbComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.html'
})
export class BreadcrumbComponent {

  private currentSite:any;

  constructor(private fb: FirebaseProvider, private navCtrl: NavController) {
  }

  ngAfterViewInit(){
    this.currentSite = this.navCtrl.getActive().name;
  }

  prevStep(site){
    let pushSite:any;
    if (site == 'BPatientPage' && this.fb.patientPageStatus == true && site != this.currentSite){
      this.navCtrl.push(BPatientPage);
    } else if (site == 'BMedikamentPage' && this.fb.medikamentPageStatus == true){
      this.navCtrl.push(BMedikamentPage);
    } else if (site == 'BDosierungPage' && this.fb.dosierungPageStatus == true) {
      this.navCtrl.push(BDosierungPage);
    } else if (site == 'BScanPage' && this.fb.scanPageStatus == true){
      this.navCtrl.push(BScanPage);
    } else if (site == 'BZusammenfassungPage' && this.fb.zusammenfassungPageStatus == true){
      this.navCtrl.push(BZusammenfassungPage);
    }
  }

}
