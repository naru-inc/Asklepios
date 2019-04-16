import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Asklepios';
  constructor() {
    const config = {
      apiKey: 'AIzaSyBEytp47XOhxHHKSn5qQhyfEElIkI3GW18',
      authDomain: 'asklepios-189516.firebaseapp.com',
      databaseURL: 'https://asklepios-189516.firebaseio.com',
      projectId: 'asklepios-189516',
      storageBucket: 'asklepios-189516.appspot.com',
      messagingSenderId: '565815503126'
    };
    firebase.initializeApp(config);
  }
}
