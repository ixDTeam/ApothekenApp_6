import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BScanPage } from './b-scan';

@NgModule({
  declarations: [
    BScanPage,
  ],
  imports: [
    IonicPageModule.forChild(BScanPage),
  ],
})
export class BScanPageModule {}
