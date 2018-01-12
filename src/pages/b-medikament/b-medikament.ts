import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/switchMap';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { Observable } from 'rxjs/Observable'


@IonicPage()
@Component({
  selector: 'page-b-medikament',
  templateUrl: 'b-medikament.html',
})
export class BMedikamentPage {

  searchInput:any;
  search$: Subject<string|null>;
  drugs: Observable<any>;
  drugsVar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, public loadingCtrl: LoadingController ) {
  }

ngOnInit(){
  let loading = this.loadingCtrl.create({
    content: 'Wird geladen'
  });
  //loading.present();
  this.firebaseProvider.getDrugs("").snapshotChanges().subscribe(changes => this.drugsVar = changes);
  //loading.dismiss();
}




searchEvent(searchInput){
  searchInput = searchInput || '';
  searchInput = searchInput.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  this.firebaseProvider.getDrugs(searchInput).snapshotChanges().subscribe(changes => this.drugsVar = changes);
}

nextStep(key){
  this.navCtrl.push(BDosierungPage, {
    drugName: key,
  });
  this.firebaseProvider.medikament = key;
}


}
