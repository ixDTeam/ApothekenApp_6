import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { BMedikamentPage } from '../b-medikament/b-medikament';
import { BDosierungPage } from '../b-dosierung/b-dosierung';
import { BScanPage } from '../b-scan/b-scan';
import { BZusammenfassungPage } from '../b-zusammenfassung/b-zusammenfassung';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-b-patient',
  templateUrl: 'b-patient.html',
})
export class BPatientPage {

  authForm: FormGroup;

  private patientID:any;
  highlightColor:any;

  constructor(public navCtrl: NavController, public fb: FirebaseProvider, public formBuilder: FormBuilder) {
    this.patientID = fb.getPatientenID();
    this.authForm = formBuilder.group({

    patientID: [this.patientID, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
    });

  }

  onSubmit(value: any): void {
    if(this.authForm.valid) {
      this.fb.setPatintenID(value.patientID);
      this.navCtrl.push(BMedikamentPage);
      this.fb.medikamentPageStatus = true;
    }
  }


}
