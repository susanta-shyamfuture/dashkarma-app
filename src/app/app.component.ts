import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Events, MenuController, Platform, ToastController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private onDestroyUnSubscribe = new Subject<void>();
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  appPages = [
    {
      title: 'Home',
      url: '/user/home',
      icon: 'home'
    },
    {
      title: 'Notifications',
      url: '/user/notification',
      icon: 'notifications'
    },
    {
      title: 'Menu',
      url: '/user/menu',
      icon: 'menu'
    },
    {
      title: 'Profile',
      url: '/user/profile',
      icon: 'person'
    }
  ];
  loggedIn = false;
  dark = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  ngAfterViewInit() {
    this.backbuttonInitializer();
  }

  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('darkMode').then(darkModeValue => {
        this.dark = darkModeValue;
        this.setStatusBarStyle();
      });
      this.splashScreen.hide();
    });
  }

  private setStatusBarStyle() {
    if (this.dark) {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#000000');
    } else {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
    }
  }

  private backbuttonInitializer() {
    this.platform.backButton
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe(() => {
    // this.platform.backButton
    // .subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/login' || this.router.url === '/user/home') {
        // or if that doesn't work, try
        this.presentAlertConfirm();
        console.log('inner exit');
      } else {
        // this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
        this.presentAlertConfirm();
        console.log('inner exit');
      }
    });
  }
  async presentAlertConfirm() {
    console.log('presentAlertConfirm');
    const alert = await this.alertController.create({
      header: 'Exit',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  toggleTheme() {
    this.dark = !this.dark;
    this.storage.set('darkMode', this.dark);
    this.setStatusBarStyle();
  }
}
