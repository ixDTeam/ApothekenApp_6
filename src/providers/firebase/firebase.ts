import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class FirebaseProvider {

  private ScannerID = "00001";

  orders: Observable<any[]>;
  dosen: Observable<any[]>;
  drugs: Observable<any[]>;

  ordersRef: AngularFireList<any>;

  ordersStore:any[] = [];

  // Waiting List
  ordersWaiting:any;
  ordersWaitingRef: AngularFireList<any>;

  scannerRef:any;
  dosenRef: AngularFireList<any>;
  drugsRef: AngularFireList<any>;


  // Breadcrumb
  public patientPageStatus = true;
  public medikamentPageStatus = false;
  public dosierungPageStatus = false;
  public scanPageStatus = false;
  public zusammenfassungPageStatus = false;

  currentOrderID: any;

  private patientID: any;

  BoxID:any;
  medikament: any = '';
  dosierung_Mo: any = '';
  dosierung_Mi: any = '';
  dosierung_Ab: any = '';
  dosierung_Na: any = '';
  dosierung_laenge: any = '';
  dosierung_einheit: any = '';


  constructor(public db: AngularFireDatabase) {
    this.ordersWaitingRef = this.db.list('/Orders/',  ref => ref.orderByChild('Status').equalTo('Waiting'));
    this.ordersRef = db.list('/Orders/');
    this.dosenRef = db.list('/Box/');
    this.scannerRef = db.object('/Scanner/Devices/'+this.ScannerID);
  }

  get_ordersRef(){
    return this.ordersRef
  }

  get_ordersWaitingRef(){
    return this.ordersWaitingRef
  }

  getItems(){
    let ordersWaiting
  }

  getMedikament(){
    return this.medikament;
  }

  getDrugs(value) {
    return this.db.list('/Drugs/', ref => ref.orderByKey().startAt(value).endAt(value + "\uf8ff"));
  }

  getScannerID(){
    return this.ScannerID
  }

  getPatientenID() {
    return this.patientID
  }

  setPatintenID(id) {
    // this.patientID = id;
    console.log("PatientenID wurde geändernt auf " + this.patientID);
  }

  getBox() {
    return this.dosenRef;
  }

  deleteItem(key: string) {
    this.ordersRef.remove(key);
  }


  deleteToArray(index){
    this.ordersStore.splice(index, 1);
  }

  newOrderToArray(){
    var Order = {
      "BoxID":  this.BoxID,
      "Medikament": this.medikament,
      "PatientID": this.patientID,
      "dosierung" : {
        dosierung_Mo: this.dosierung_Mo,
        dosierung_Mi: this.dosierung_Mi,
        dosierung_Ab: this.dosierung_Ab,
        dosierung_Na: this.dosierung_Na,
        dosierung_einheit: this.dosierung_einheit,
        dosierung_laenge: this.dosierung_laenge,
      }
    };
    this.ordersStore.push(Order);
    console.log(this.ordersStore);
  }

  clearOrderArray(){
      this.ordersStore.length=0;
  }

  newOrderToFirebase() {
    let Order = {
      'Status': "Waiting"
      }
      this.ordersRef
      .push({ 'Status': "Waiting" })
      .then((item) => {
        this.currentOrderID = item.key;
        for (var i = 0; i < this.ordersStore.length; i++){
          console.log(this.ordersStore[i]);
          this.db.list('/Box/').set(this.ordersStore[i].BoxID, { BoxID: this.ordersStore[i].BoxID, OrderID: this.currentOrderID, OrderNR: i });
          var newOrder = this.ordersStore[i];
          this.db.list('/Orders/'+this.currentOrderID).set("Order_"+i,this.ordersStore[i]);
      }

    });
  }

}
