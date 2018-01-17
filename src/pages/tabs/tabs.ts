import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MultiuserPage } from '../multiuser/multiuser';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MultiuserPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
