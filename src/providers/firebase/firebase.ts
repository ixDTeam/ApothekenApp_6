import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FirebaseProvider {

    orders: Observable<any[]>;
    dosen: Observable<any[]>;
    drugs: Observable<any[]>;

    ordersRef: AngularFireList<any>;

    // Waiting List
    ordersWaiting: Observable<any[]>;
    ordersWaitingRef: AngularFireList<any>;

    ScannerRef: AngularFireList<any>;
    DosenRef: AngularFireList<any>;
    DrugsRef: AngularFireList<any>;

    currentOrderID:any;

    medikament:any = '';
    dosierung_Mo:any = '';
    dosierung_Mi:any = '';
    dosierung_Ab:any = '';
    dosierung_Na:any = '';

    dosierung_laenge:any = '';
    dosierung_einheit:any = '';


  constructor(public db: AngularFireDatabase) {
        this.ScannerRef = db.list('/Scanner/');

        this.DosenRef = db.list('/Box/');
        this.ordersRef = db.list('/Orders/');

        this.orders = this.ordersRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        // Orders Waiting
        this.ordersWaitingRef = db.list('/Orders/', ref => ref.orderByChild('status').equalTo('1'));
        this.ordersWaiting = this.ordersWaitingRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        // this.ordersWaitingRef = db.list('/Orders/', ref => ref.orderByChild('status').equalTo('1'));
        // this.ordersWaiting = this.ordersWaitingRef.snapshotChanges(changes => {
        //   console.log(changes);
        //   return changes;
        // });

        this.dosen = this.DosenRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        // this.drugs = this.DrugsRef.snapshotChanges().map(changes => {
        //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        // });
      }

      getDrugs(value){
        return this.db.list('/Drugs/', ref => ref.orderByKey().startAt(value).endAt(value+"\uf8ff"));
      }


      getBox(){
        return this.DosenRef;
      }

      addItem(newElement: string) {
        this.ordersRef.push({ Apotheke: newElement })
        .then((item) => {
          console.log(item.key);
        });;
      }

      deleteItem(key: string) {
      this.ordersRef.remove(key);
    }


    newOrder(BoxID){
    let Order = {
          'medikament': this.medikament,
          'BoxID': BoxID,
          dosierung: {
            'dosierung_Mo': this.dosierung_Mo,
            'dosierung_Mi': this.dosierung_Mi,
            'dosierung_Ab': this.dosierung_Ab,
            'dosierung_Na': this.dosierung_Na,
            'dosierung_laenge': this.dosierung_laenge,
            'dosierung_einheit': this.dosierung_einheit
          }
        }
      this.ordersRef
      .push({ Order }).
        then((item) => {
          this.currentOrderID = item.key;
          console.log(BoxID);
          //this.db.list('/Box/'+BoxID).push({ BoxID: BoxID, OrderID: this.currentOrderID });
          this.db.list('/Box/').set('BoxID_'+BoxID, { BoxID: BoxID, OrderID: this.currentOrderID });
        });
    }

    updateItem(key: string, element: string, newElement: string) {
    this.ordersRef.update(key, { Apotheke: newElement });
  }

}
