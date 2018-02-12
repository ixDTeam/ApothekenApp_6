import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BPatientPage } from '../b-patient/b-patient';
import { DetailPage } from '../detail/detail';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { Subject } from 'rxjs/Subject';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // ordersWaiting:any;
  ordersWaiting:any[];
  ordersKommen:any[];

  ordersWaitingChanged = new Subject<any>();
  ordersKommenChanged = new Subject<any>();
  orders:any;

  controll:any;
  key:any;


  constructor(public navCtrl: NavController, public fb: FirebaseProvider, public modalCtrl: ModalController) {

  }


  ionViewDidEnter(){

    // Alle Orders
    this.fb.get_ordersRef()
    .snapshotChanges()
    .subscribe(changes => this.orders = changes, (err) => {console.error(err);});

    //Kommende Orders
    this.fb.get_ordersKommenRef().snapshotChanges().map(actions => {
     this.ordersKommen = actions.map(action => ({ key: action.key, ...action.payload.val() }));
     console.log(this.ordersWaiting);
     this.ordersKommenChanged.next();
   }).subscribe(items => {
     this.ordersKommenChanged.next();
   });

  }

  displayItem(key){
    let modal = this.modalCtrl.create(DetailPage, {OrderID: key});
    modal.present();
  }


}
