import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BMedikamentPage } from '../b-medikament/b-medikament';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {

  }

startNew(){
  this.navCtrl.push(BMedikamentPage);
}

}
