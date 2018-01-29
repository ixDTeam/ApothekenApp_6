import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  orders:any;
  ordersObj:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider, params: NavParams) {
    fb.db.list('/Orders/'+params.get('OrderID'))
    .snapshotChanges().subscribe(changes => this.orders = changes)
  }


}
