import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BPatientPage } from '../b-patient/b-patient';

import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ordersWaiting:any;
  orders:any;
  controll:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider, public modalCtrl: ModalController) {

    // Order mit Status Waiting
    fb.get_ordersWaitingRef()
    .valueChanges()
    .subscribe(changes => this.ordersWaiting = changes);


    // Alle Orders
    fb.get_ordersRef()
    .snapshotChanges()
    .subscribe(changes => this.orders = changes, (err) => {console.error(err);});

  }

  startNew(){
    this.navCtrl.push(BPatientPage);
  }

  displayItem(key){
    let modal = this.modalCtrl.create(DetailPage, {OrderID: key});
    console.log(key);
    modal.present();
  }


}
