import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import 'rxjs/add/operator/take'

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
  if (this.prevScannerValue == this.scannerValue){
    this.navCtrl.push(BZusammenfassungPage);
  }




}

}
