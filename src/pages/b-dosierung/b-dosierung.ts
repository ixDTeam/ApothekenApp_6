import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { BPatientPage } from '../b-patient/b-patient';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BScanPage } from '../b-scan/b-scan';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';

/**
 * Generated class for the BDosierungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-dosierung',
  templateUrl: 'b-dosierung.html',
})
export class BDosierungPage {

 dosierung_Mo:any = 0;
 dosierung_Mi:any = 0;
 dosierung_Ab:any = 0;
 dosierung_Na:any = 0;

 dosierung_laenge:any = 1;
 dosierung_einheit:any = 1;

 medikament:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider) {
    fb.db.object('/Drugs/'+fb.getMedikament()).valueChanges()
    .subscribe(changes => {
       this.medikament = changes;
       this.dosierung_Mo = this.medikament.Dosierung.Mo;
       this.dosierung_Mi = this.medikament.Dosierung.Mi;
       this.dosierung_Ab = this.medikament.Dosierung.Ab;
       this.dosierung_Na = this.medikament.Dosierung.Na;
       this.dosierung_einheit = this.medikament.Dosierung.Einheit;
       this.dosierung_laenge = this.medikament.Dosierung.Laenge;
    });

  }

  dosierungAdd(dosierung){

  switch (dosierung) {
    case 'Mo':
      this.dosierung_Mo += 1;
    break ;

    case 'Mi':
      this.dosierung_Mi += 1;
    break ;

    case 'Ab':
      this.dosierung_Ab += 1;
    break ;

    case 'Na':
      this.dosierung_Na += 1;
    break ;

    case'laenge':
      this.dosierung_laenge += 1;
    break;

    case'einheit':
      this.dosierung_einheit += 1;
    break;
  }
}

  dosierungSub(dosierung){
    switch (dosierung) {
      case 'Mo':
        this.dosierung_Mo -= 1;
      break ;

      case 'Mi':
        this.dosierung_Mi -= 1;
      break ;

      case 'Ab':
        this.dosierung_Ab -= 1;
      break ;

      case 'Na':
        this.dosierung_Na -= 1;
      break ;

      case'laenge':
        this.dosierung_laenge -= 1;
      break;

      case'einheit':
        this.dosierung_einheit -= 1;
      break;
    }
  }

  nextStep(){
    this.fb.scanPageStatus = true;
    this.navCtrl.push(BScanPage, {
    });
    this.fb.dosierung_Mo = this.dosierung_Mo;
    this.fb.dosierung_Mi = this.dosierung_Mi;
    this.fb.dosierung_Ab = this.dosierung_Ab;
    this.fb.dosierung_Na = this.dosierung_Na;
    this.fb.dosierung_laenge = this.dosierung_laenge;
    this.fb.dosierung_einheit = this.dosierung_einheit;

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
