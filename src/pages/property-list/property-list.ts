import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

import { CreatePropertyPage, PropertyDetailPage, AddLeaseholdPage } from '../pages';

@Component({
  selector: 'page-property-list',
  templateUrl: 'property-list.html'
})
export class PropertyListPage {

  public propertyList: any;
  public leaseholdList: any;
  public numberOfProperties: number;
  public numberOfLeaseholds: any;

  constructor(public navController: NavController, public dataService: DataService,
    public actionSheetController: ActionSheetController, public platform: Platform) {

    this.propertyList = this.dataService.getPropertyList();
    // this.propertyList.subscribe(properties => {
    //   properties.forEach(property => {
    //     this.leaseholdList = this.dataService.getLeaseholdList(property.$key)
    //     //this.leaseholdList
    //       .map(leaseholdList => leaseholdList.length)
    //       .subscribe(length => {
    //         console.log(length);
    //         this.numberOfLeaseholds = length;
    //       });
    //   });
    // });
  }

  createProperty(): void {
    this.navController.push(CreatePropertyPage);
  }

  goToPaidPayment(propertyId: string): void {
    this.navController.push(PropertyDetailPage, { propertyId: propertyId })
  }

  morePropertyOptions(propertyId) {
    let actionSheet = this.actionSheetController.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.dataService.removeProperty(propertyId);
            this.navController.pop();
          }
        },
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navController.push(PropertyDetailPage, {
              propertyId: propertyId
            });
          }
        },
        {
          text: 'Edit Property',
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

}
