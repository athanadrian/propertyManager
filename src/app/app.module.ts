import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage, HomePage, LoginPage, ResetPasswordPage, ProfilePage, PaymentDetailPage,
          CreatePaymentPage, PropertyListPage, PropertyDetailPage, CreatePropertyPage,
          AddLeaseholdPage, AddOwnerPage, LeaseholdDetailPage, OwnerListPage,
          AddRenterPage, RenterListPage, RenterDetailPage, AddContractPage } from '../pages/pages';
import { AuthService } from '../providers/auth-service';
import { ProfileService } from '../providers/profile-service';
import { DataService } from '../providers/data-service';


import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'

export const firebaseConfig = {
  apiKey: "AIzaSyBZIy74Yc1rqkkG64JBn32SmHd7tgS1Hqk",
  authDomain: "trackpayment-53ba2.firebaseapp.com",
  databaseURL: "https://trackpayment-53ba2.firebaseio.com",
  storageBucket: "trackpayment-53ba2.appspot.com",
  messagingSenderId: "652218493139"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    ProfilePage,
    PaymentDetailPage,
    CreatePaymentPage,
    PropertyListPage,
    PropertyDetailPage,
    CreatePropertyPage,
    AddLeaseholdPage,
    AddOwnerPage,
    LeaseholdDetailPage,
    OwnerListPage,
    AddRenterPage,
    RenterListPage,
    RenterDetailPage,
    AddContractPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    ProfilePage,
    PaymentDetailPage,
    CreatePaymentPage,
    PropertyListPage,
    PropertyDetailPage,
    CreatePropertyPage,
    AddLeaseholdPage,
    AddOwnerPage,
    LeaseholdDetailPage,
    OwnerListPage,
    AddRenterPage,
    RenterListPage,
    AddContractPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ProfileService, AuthService, DataService]
})
export class AppModule { }
