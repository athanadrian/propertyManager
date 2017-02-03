import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';

import { PropertyListPage, OwnerListPage } from '../../pages/pages';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public propertyList: any;
  public numberOfProperties: number;
  public numberOfActiveContracts:number;

  constructor(public navController: NavController, public authService: AuthService,
    public dataService: DataService) {

    this.dataService.getPropertyList()
      .map(list => list.length)
      .subscribe((length) => {
        this.numberOfProperties = length;
      });

    this.dataService.getContractList()
    .map(list=>list.length)
    .subscribe((length) => {
        this.numberOfActiveContracts = length;
      });
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.navController.setRoot(LoginPage);
    });
  }

  updateName() {
    console.log('Updating name....')
  }

  showProperties() {
    this.navController.push(PropertyListPage);
  }

  showRenters() {
    this.navController.push(OwnerListPage);
  }

}
