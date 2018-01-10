import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Subject } from 'rxjs/Subject'

import { BDosierungPage } from '../b-dosierung/b-dosierung';


@IonicPage()
@Component({
  selector: 'page-b-medikament',
  templateUrl: 'b-medikament.html',
})
export class BMedikamentPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider ) {

  }


nextStep(key){
  this.navCtrl.push(BDosierungPage, {
    drugName: key,
  });
  this.firebaseProvider.medikament = key;
}


}
