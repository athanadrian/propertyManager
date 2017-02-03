import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

import { SignUpPage } from '../providers/data-service';
import { Payment } from '../../models/models';

@Component({
  selector: 'page-payment-detail',
  templateUrl: 'payment-detail.html'
})
export class PaymentDetailPage {

  public payment: Payment;

  constructor(public navController: NavController, public navParams: NavParams, public platform: Platform,
    public actionSheetController: ActionSheetController, public alertController: AlertController, public dataService: DataService) {

    let pId = this.navParams.get('paymentId');
    this.dataService.getPayment(pId)
      .subscribe(paymentSnap => {
        this.payment = paymentSnap;
      });
  }

  showOptions(paymentId: string) {
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
          text: 'Mark as Paid',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.dataService.payPayment(paymentId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
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
