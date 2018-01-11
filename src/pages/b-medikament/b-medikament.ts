import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  search$: Subject<string|null>

  drugs: Observable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider ) {
    // this.drugs = this.firebaseProvider.getDrugs(this.searchInput).snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

ngOnInit(){
  this.drugs = this.firebaseProvider.getDrugs("").snapshotChanges().map(changes => {
    console.log(changes);
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}


searchEvent(searchInput){
  searchInput = searchInput.TitleCasePipe();
  this.drugs = this.firebaseProvider.getDrugs(searchInput).snapshotChanges().map(changes => {
    console.log(changes);
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}

nextStep(key){
  this.navCtrl.push(BDosierungPage, {
    drugName: key,
  });
  this.firebaseProvider.medikament = key;
}


}
