import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { LoginPage } from '../pages/login/login';
import { AllpostPage } from '../pages/allpost/allpost';
import { RegisterPage } from '../pages/register/register';
import { AddstoryPage } from '../pages/addstory/addstory';
import { DetailstoryPage } from '../pages/detailstory/detailstory';
import { EditprofilPage } from '../pages/editprofil/editprofil';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import {Storage} from '@ionic/storage';
@NgModule({
  declarations: [
  MyApp,
  Page1,
  Page2,
  LoginPage,
  RegisterPage,
  AddstoryPage,
  DetailstoryPage,
  EditprofilPage,
  AllpostPage
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  Page1,
  Page2,
  LoginPage,
  RegisterPage,
  AddstoryPage,
  DetailstoryPage,
  EditprofilPage,
  AllpostPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,FIREBASE_PROVIDERS,defaultFirebase({
    apiKey: "AIzaSyC2LTmM9L-8RwVo9J3Cdva9_b88SGGRzg8",
    authDomain: "story-e5111.firebaseapp.com",
    databaseURL: "https://story-e5111.firebaseio.com",
    storageBucket: "story-e5111.appspot.com",

  })]
})
export class AppModule {}
