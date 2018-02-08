import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  orderID:any;
  orderLength = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider, public params: NavParams, public toastCtrl: ToastController) {
    this.orderID = params.get('OrderID');

    fb.db.list('/Orders/'+this.orderID)
    .valueChanges().subscribe(changes =>{
      console.log(changes);
      this.orders = changes;
      this.orderLength = this.orders.length-1;
    })
  }

  cancle(){
    this.navCtrl.pop();
  }

  confirmOrder(){
    this.fb.db.list('/Orders/'+this.orderID).set("Status", "Done");
    this.succesToast('Die Bestellung wurde erfolgreich abgeschlossen.')
    this.navCtrl.pop();
  }

  cancleOrder(){
    this.fb.db.list('/Orders/'+this.orderID).remove();
    this.succesToast('Die Bestellung wurde erfolgreich gelöscht.')
    this.navCtrl.pop();
  }

  succesToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

}
