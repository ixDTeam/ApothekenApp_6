import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { KommendeBestellungenPage } from '../kommende-bestellungen/kommende-bestellungen';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = KommendeBestellungenPage;
  tab3Root = SettingsPage;

  connectionStatus = false;

  constructor(public fb: FirebaseProvider) {
    this.fb.db.object('/System/Connection').valueChanges().subscribe(changes => {
      if (changes == 1){
        this.connectionStatus = true;
      } else {
        this.connectionStatus = false;
      }
    });
  }

}
