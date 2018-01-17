import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import 'rxjs/add/operator/take'

import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';


/**
 * Generated class for the BScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-scan',
  templateUrl: 'b-scan.html',
})
export class BScanPage {

prevScannerValue:any;
scannerValue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {
    fb.scannerRef.valueChanges().subscribe(changes => this.scannerValue);
    // fb.scannerRef.valueChanges().subscribe( changes =>
    //   this.nextStep()
    // );
  }


nextStep(){
  if (this.prevScannerValue == this.scannerValue){
    this.navCtrl.push(BZusammenfassungPage);
  }

}

}
