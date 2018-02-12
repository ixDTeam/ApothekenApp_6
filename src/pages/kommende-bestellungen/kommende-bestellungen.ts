import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Subject } from 'rxjs/Subject';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

/**
 * Generated class for the KommendeBestellungenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kommende-bestellungen',
  templateUrl: 'kommende-bestellungen.html',
})
export class KommendeBestellungenPage {

  ordersKommen:any[];

  ordersKommenChanged = new Subject<any>();
  orders:any;

  controll:any;
  key:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {

  }

  ionViewDidLoad() {
    this.fb.get_ordersKommenRef().snapshotChanges().map(actions => {
     this.ordersKommen = actions.map(action => ({ key: action.key, ...action.payload.val() }));
     this.ordersKommenChanged.next();
   }).subscribe(items => {
     this.ordersKommenChanged.next();
   });  }

}
