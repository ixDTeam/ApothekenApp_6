import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { BPatientPage } from '../b-patient/b-patient';
import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BScanPage } from '../b-scan/b-scan';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';

import * as moment from 'moment';

import { CalendarComponentOptions } from 'ion2-calendar'

/**
 * Generated class for the BDosierungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-b-dosierung',
  templateUrl: 'b-dosierung.html',
})
export class BDosierungPage {

  dosis_card:any = true;
  time_card:any = false;

 dosierung_Mo:any = 0;
 dosierung_Mi:any = 0;
 dosierung_Ab:any = 0;
 dosierung_Na:any = 0;

 dosierung_laenge:any = 1;
 dosierung_einheit:any = 1;

 dosierungTage: any = 0;
 anzahlPillen: any = 0;

 currentDate = moment().format('YYYY-MM-DD');
 endDate = moment().format('YYYY-MM-DD');

medikament:any;
medikamentPreis:any;
gesamtPreis:any;

newCurrentDate = moment().add(1, 'M');

 dateRange: { from: string; to: string; };
 type: 'object'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
 optionsRange: CalendarComponentOptions = {
   pickMode: 'range',
   weekStart: 1
 };


  constructor(public navCtrl: NavController, public fb: FirebaseProvider) {
    if(fb.scanPageStatus == false){
      fb.db.object('/Drugs/'+fb.getMedikament()).valueChanges()
      .subscribe(changes => {
         this.medikament = changes;
         this.dosierung_Mo = this.medikament.Dosierung.Mo;
         this.dosierung_Mi = this.medikament.Dosierung.Mi;
         this.dosierung_Ab = this.medikament.Dosierung.Ab;
         this.dosierung_Na = this.medikament.Dosierung.Na;
         this.dosierung_einheit = this.medikament.Dosierung.Einheit;
         this.dosierung_laenge = this.medikament.Dosierung.Laenge;
         this.medikamentPreis = this.medikament.Preis;
         this.updateCalender();
      });
    } else {
      this.dosierung_Mo = fb.dosierung_Mo;
      this.dosierung_Mi = fb.dosierung_Mi;
      this.dosierung_Ab = fb.dosierung_Ab;
      this.dosierung_Na = fb.dosierung_Na;
      this.dosierung_einheit = fb.dosierung_einheit;
      this.dosierung_laenge = fb.dosierung_laenge;
      this.medikamentPreis = fb.medikamentPreis;
      this.updateCalender();
    }
  }


  dosisCard(){
    if(this.dosis_card == false){
      this.dosis_card = true;
      this.time_card = false;
    }
    else if(this.dosis_card == true){
      this.dosis_card = false;
      this.time_card = true;
    }
  }

  timeCard(){
    if(this.time_card == false){
      this.time_card = true;
      this.dosis_card = false;
    }
    else if(this.time_card == true){
      this.time_card = false;
    }
  }

  dosierungAdd(dosierung){

  switch (dosierung) {
    case 'Mo':
      this.dosierung_Mo += 1;
    break ;
    case 'Mi':
      this.dosierung_Mi += 1;
    break ;

    case 'Ab':
      this.dosierung_Ab += 1;
    break ;

    case 'Na':
      this.dosierung_Na += 1;
    break ;

    case'laenge':
      this.dosierung_laenge += 1;
      this.updateCalender();
    break;

    case'einheit':
      this.dosierung_einheit += 1;
      this.updateCalender();
    break;
  }
  this.calculateAmount();
  this.saveData();
}

  dosierungSub(dosierung){
    switch (dosierung) {
      case 'Mo':
        this.dosierung_Mo -= 1;
      break ;

      case 'Mi':
        this.dosierung_Mi -= 1;
      break ;

      case 'Ab':
        this.dosierung_Ab -= 1;
      break ;

      case 'Na':
        this.dosierung_Na -= 1;
      break ;

      case'laenge':
        this.dosierung_laenge -= 1;
        this.updateCalender();
      break;

      case'einheit':
        this.dosierung_einheit -= 1;
        this.updateCalender();
      break;
    }
    this.calculateAmount();
    this.saveData();
  }


updateCalender(){
  if(this.dosierung_einheit == 1){
    this.endDate = moment().add(this.dosierung_laenge-1, 'd')
  } if (this.dosierung_einheit == 2){
    this.endDate = moment().add(this.dosierung_laenge, 'w')
  } else if (this.dosierung_einheit == 3){
    this.endDate = moment().add(this.dosierung_laenge, 'M')
  }
  this.calculateAmount();
  this.dateRange = {
    from: this.currentDate,
    to: this.endDate
  }
}

calculateAmount(){
    this.dosierungTage = this.endDate.diff(this.currentDate, 'days');
    this.anzahlPillen = (this.dosierungTage*this.dosierung_Mo)+(this.dosierungTage*this.dosierung_Mi)+(this.dosierungTage*this.dosierung_Ab)+(this.dosierungTage*this.dosierung_Na);
    this.gesamtPreis = this.anzahlPillen * this.medikamentPreis;
}


saveData(){
    this.fb.dosierung_Mo = this.dosierung_Mo;
    this.fb.dosierung_Mi = this.dosierung_Mi;
    this.fb.dosierung_Ab = this.dosierung_Ab;
    this.fb.dosierung_Na = this.dosierung_Na;
    this.fb.dosierung_laenge = this.dosierung_laenge;
    this.fb.dosierung_einheit = this.dosierung_einheit;
    this.fb.anzahlPillen = this.anzahlPillen;
    this.fb.gesamtPreis = this.gesamtPreis;
    this.fb.medikamentPreis = this.medikamentPreis;
  }

  nextStep(){
      this.fb.scanPageStatus = true;
      this.navCtrl.push(BScanPage, {
      });
      this.saveData();
  }

}
