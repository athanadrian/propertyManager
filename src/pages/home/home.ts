import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

import { ProfilePage, CreatePaymentPage, PaymentDetailPage } from '../pages';
import{ Payment } from '../../models/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public paymentList: any;

  constructor(public navController: NavController, public dataService: DataService,
    public actionSheetController: ActionSheetController, public platform: Platform) {

    this.paymentList = this.dataService.getPaymentList();
  }

  createPayment(): void {
    this.navController.push(CreatePaymentPage);
  }

  goToPaidPayment(paymentId: string): void {
    this.navController.push(PaymentDetailPage, { paymentId: paymentId })
  }

  goToProfile() {
    this.navController.push(ProfilePage);
  }

  morePaymentOptions(paymentId) {
    let actionSheet = this.actionSheetController.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.dataService.removePayment(paymentId);
            this.navController.pop();
          }
        },
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navController.push(PaymentDetailPage, {
              paymentId: paymentId
            });
          }
        },
        {
          text: 'Mark as Paid',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.dataService.payPayment(paymentId);
          }
        },
        {
          text: 'Cancel',
          role:'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
