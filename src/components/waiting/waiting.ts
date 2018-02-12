import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NavController, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BPatientPage } from '../../pages/b-patient/b-patient';
import { DetailPage } from '../../pages/detail/detail';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the WaitingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'waiting',
  templateUrl: 'waiting.html'
})
export class WaitingComponent {

  ordersWaiting:any[];
  ordersKommen:any[];

  ordersWaitingChanged = new Subject<any>();

  constructor(public navCtrl: NavController, public fb: FirebaseProvider, public modalCtrl: ModalController) {
    this.fb.get_ordersWaitingRef().snapshotChanges().map(actions => {
     this.ordersWaiting = actions.map(action => ({ key: action.key, ...action.payload.val() }));
     console.log(this.ordersWaiting);
     this.ordersWaitingChanged.next();
   }).subscribe(items => {
     this.ordersWaitingChanged.next();
   });
  }


  startNew(){
    this.navCtrl.push(BPatientPage);
  }

  displayItem(key){
    let modal = this.modalCtrl.create(DetailPage, {OrderID: key});
    modal.present();
  }

}
