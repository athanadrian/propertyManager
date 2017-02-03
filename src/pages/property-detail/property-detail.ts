import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

import { AddLeaseholdPage, AddOwnerPage, LeaseholdDetailPage, AddRenterPage } from '../../pages/pages';
import { Property, Leasehold } from '../../models/models';

@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

  public property: Property;
  public leasehold: Leasehold;
  public leaseholdList: any;
  public propertyId: string;

  constructor(public navController: NavController, public navParams: NavParams, public platform: Platform,
    public actionSheetController: ActionSheetController, public alertController: AlertController, public dataService: DataService) {

    let pId = this.navParams.get('propertyId');
    this.propertyId = pId;
    this.dataService.getProperty(pId)
      .subscribe(propertySnap => {
        this.property = propertySnap;
      });

    this.leaseholdList = this.dataService.getLeaseholdList(pId);
  }

  morePropertyOptions(propertyId) {
    let actionSheet = this.actionSheetController.create({
      title: '',
      buttons: [
        {
          text: 'Delete property',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.dataService.removeProperty(propertyId);
            this.navController.pop();
          }
        },
        {
          text: 'More details for this property',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navController.push(AddOwnerPage, {
              propertyId: propertyId
            });
          }
        },
        {
          text: 'Add Leasehold to property',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navController.push(AddLeaseholdPage, {
              propertyId: propertyId
            });
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

  moreLeaseholdOptions(leasehold) {
    //let leasehold:Leasehold;
    //this.leasehold = this.dataService.getLeasehold(this.propertyId, leasehold.$key);
    let actionSheet = this.actionSheetController.create({
      title: '',
      buttons: [
        {
          text: 'Rent it!',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            if (leasehold.isRented) {
              let alert = this.alertController.create({
                title: 'Warning!',
                subTitle: 'This leasehold is already rented!',
                buttons: ['OK']
              });
              alert.present();
            } else {
              this.navController.push(AddRenterPage, {
                leaseholdId: leasehold.$key,
                propertyId: this.propertyId
              });
            }
          }
        },
        {
          text: 'More details for this leasehold',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navController.push(LeaseholdDetailPage, {
              leaseholdId: leasehold.$key
            });
          }
        },
        {
          text: 'Delete this leasehold',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.dataService.removeLeasehold(this.propertyId, leasehold.$key);
            this.navController.pop();
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

  releaseLeasehold(leaseholdId:string){

  }

}
