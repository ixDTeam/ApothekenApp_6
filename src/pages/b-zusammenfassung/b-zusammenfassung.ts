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

box:any[] = [];
boxObj: Observable<any[]>;
test = "box_ID";



currentBoxID:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {
    this.box = fb.ordersStore;
    
  }

newArray(){
  this.fb.newArray();
}

newOrder(){
  this.fb.newOrder();
}

}
