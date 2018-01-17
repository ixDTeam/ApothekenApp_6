import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiuserPage } from './multiuser';

@NgModule({
  declarations: [
    MultiuserPage,
  ],
  imports: [
    IonicPageModule.forChild(MultiuserPage),
  ],
})
export class MultiuserPageModule {}
