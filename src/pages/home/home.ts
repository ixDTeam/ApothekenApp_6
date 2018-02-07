import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BPatientPage } from '../b-patient/b-patient';
import { Subject } from 'rxjs/Subject';

import { DetailPage } from '../detail/detail';


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

    // Order mit Status Waiting
    // fb.get_ordersWaitingRef()
    // .valueChanges()
    // .subscribe(changes => this.ordersWaiting = changes);

    // fb.get_ordersWaitingRef()
    // .snapshotChanges().subscribe(changes => {
    //     this.key = changes.keys;
    //     this.orders = changes.val();
    //     console.log(this.key);
    //
    // });

  // Orders Waiting Alt
  // this.ordersWaiting = this.fb.get_ordersWaitingRef().snapshotChanges().map(changes => {
  //   console.log(this.ordersWaiting);
  //    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  //  });

    this.fb.get_ordersWaitingRef().snapshotChanges().map(actions => {
     this.ordersWaiting = actions.map(action => ({ key: action.key, ...action.payload.val() }));
     console.log(this.ordersWaiting);
     this.ordersWaitingChanged.next();
   }).subscribe(items => {
     this.ordersWaitingChanged.next();
   });


    // Alle Orders
    fb.get_ordersRef()
    .snapshotChanges()
    .subscribe(changes => this.orders = changes, (err) => {console.error(err);});

    fb.get_ordersKommenRef()
    .snapshotChanges()
    .subscribe(changes => this.ordersKommen = changes, (err) => {console.error(err);});

    this.fb.get_ordersKommenRef().snapshotChanges().map(actions => {
     this.ordersKommen = actions.map(action => ({ key: action.key, ...action.payload.val() }));
     console.log(this.ordersWaiting);
     this.ordersKommenChanged.next();
   }).subscribe(items => {
     this.ordersKommenChanged.next();
   });

    console.log(
      this.ordersKommen
    )

  }

  startNew(){
    this.navCtrl.push(BPatientPage);
  }

  displayItem(key){
    let modal = this.modalCtrl.create(DetailPage, {OrderID: key});
    modal.present();
  }


}
