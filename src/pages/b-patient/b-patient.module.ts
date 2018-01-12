import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BPatientPage } from './b-patient';

@NgModule({
  declarations: [
    BPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(BPatientPage),
  ],
})
export class BPatientPageModule {}
