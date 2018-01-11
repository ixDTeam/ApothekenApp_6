import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable'

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

box: Observable<any[]>;
boxObj: Observable<any[]>;
test = "box_ID";

ScannerID = "00001";

currentBoxID:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    this.firebaseProvider.db.object('Box/'+this.test).valueChanges().subscribe(
      //console.log
    );

    this.firebaseProvider.db.object('Scanner/Devices/'+this.ScannerID).valueChanges().subscribe((value) => {
        this.currentBoxID = value;
        console.log(this.currentBoxID);
        this.newOrder(this.currentBoxID);
      }
    );

    this.firebaseProvider.db.object('Box').valueChanges().subscribe((value) => {
      this.outside = value;
      //console.log(this.outside);
      }
    );

      this.box = this.firebaseProvider
      .getBox()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key,
            Order: c.payload.val(),
          }));
        });

  }

  ionViewDidLoad() {

  }

newDose(){

}

newOrder(BoxID){
  this.firebaseProvider.newOrder(BoxID);
}

}
