import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data-service';

import { Leasehold, Contract, Renter } from '../../models/models';


@Component({
  selector: 'page-add-contract',
  templateUrl: 'add-contract.html'
})
export class AddContractPage {

  // leasehold: Leasehold;
  // newContractForm: any;
  // titleChanged: boolean = false;
  // typeChanged: boolean = false;
  // phoneChanged: boolean = false;
  // websiteChanged: boolean = false;
  // nameChanged: boolean = false;
  // emailChanged: boolean = false;
  // submitAttempt: boolean = false;
  // propertyId: string;
  leaseholdId: string;
  renter:Renter;

  constructor(public navController: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public dataService: DataService) {

      // this.leaseholdId = this.navParams.get('leaseholdId');
      // this.renter = this.navParams.get('renter');
      console.log(this.renter)

}


}
