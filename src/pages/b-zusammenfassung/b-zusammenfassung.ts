import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable'

import { BMedikamentPage } from '../b-medikament/b-medikament';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {
    this.box = fb.ordersStore;
    this.fb.newOrderToArray();
  }


editToArray(index){
  // Eher Fake derzeit. Kann besser!
  this.fb.ordersStore.splice(index, 1);
  this.navCtrl.push(BMedikamentPage);
}

deleteToArray(index){
  this.fb.ordersStore.splice(index, 1);
}

startNewOrderToArray(){
  this.navCtrl.push(BMedikamentPage);
}

newOrderToFirebase(){
  this.fb.newOrderToFirebase();
}

}
