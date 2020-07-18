import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import BackgroundFetch from "cordova-plugin-background-fetch";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  state: boolean;

  constructor( public platform: Platform,
          private ngZone: NgZone ) {
    this.state = false;
    this.platform.ready().then(this.onDeviceReady.bind(this));
  }
  onDeviceReady() {
    // Your background-fetch handler.
    let fetchCallback = function(taskId) {
        console.log('[js] BackgroundFetch event received from tgg-smartwatch : ', taskId);
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        this.ngZone.run(() => {
          this.state = true;
        })
        BackgroundFetch.finish(taskId);
    };

    let failureCallback = function(error) {
        console.log('- BackgroundFetch failed', error);
    };

    BackgroundFetch.configure(fetchCallback, failureCallback, {
        minimumFetchInterval: 15, // <-- default is 15
        stopOnTerminate: false
    });
  }
}
