import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { CreatePropertyPage, PropertyDetailPage, AddLeaseholdPage } from '../pages';
import { Payment, Property, Leasehold, Renter, Contract } from '../models/models';
import 'rxjs/add/operator/do';

@Component({
  selector: 'page-property-list',
  templateUrl: 'property-list.html'
})
export class PropertyListPage {

  public propertyList: any;
  public leaseholdList: FirebaseListObservable<any[]>

  public numberOfProperties: number;
  public numberOfLeaseholds: any;
  public propertyId: string;
  public leaseholdId: string;

  constructor(public navController: NavController, public dataService: DataService,
    public actionSheetController: ActionSheetController, public platform: Platform) {

    this.propertyList = this.dataService.getPropertyList()
      .map((properties) => {
        return properties.map(property => {
          property.leaseholds = this.dataService.getLeaseholdList(property.$key);
          console.log('pp: ',property);
          return property;
        });
      });
    // this.propertyList = this.dataService.getPropertyList();
    // this.propertyList.subscribe(properties => {
    //   properties.forEach(property => {
    //     this.propertyId = property.$key;
    //     console.log('property: ', property);
    //     property.map((leaseholds) => {
    //         return leaseholds.map(leasehold => {
    //           key.data = this.af.database.list(`API_URL/${key.$key}`);
    //           return key;
    //         })
    //       })
    //this.leaseholdList =property.leaseholdList //this.dataService.getLeaseholdList(property.$key)
    //.subscribe((leaseholds) => {
    // console.log('leaseholds: ',leaseholds);
    // leaseholds.forEach(leasehold=>{
    //   this.leaseholdId=leasehold.$key
    //   console.log('leasehold: ',leasehold);
    //   console.log('leasehold-r: ',leasehold.renterList);
    // })
    // this.numberOfLeaseholds = this.leaseholdList.length
    //  });
    //this.leaseholdList
    //     .map(leaseholdList => leaseholdList.length)
    //     .subscribe(length => {
    //       console.log(length);
    //       this.numberOfLeaseholds = length;
    //     });
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
