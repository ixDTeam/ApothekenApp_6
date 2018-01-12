import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BMedikamentPage } from '../b-medikament/b-medikament';


/**
 * Generated class for the BPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-patient',
  templateUrl: 'b-patient.html',
})
export class BPatientPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BPatientPage');
  }

  nextStep(){
    this.navCtrl.push(BMedikamentPage);
  }
}
