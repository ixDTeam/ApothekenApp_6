import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KommendeBestellungenPage } from './kommende-bestellungen';

@NgModule({
  declarations: [
    KommendeBestellungenPage,
  ],
  imports: [
    IonicPageModule.forChild(KommendeBestellungenPage),
  ],
})
export class KommendeBestellungenPageModule {}
