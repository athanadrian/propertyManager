import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data-service';

import { AddContractPage } from '../../pages/pages';
import { Leasehold, Contract, Renter } from '../../models/models';

@Component({
  selector: 'page-add-renter',
  templateUrl: 'add-renter.html'
})
export class AddRenterPage {

  //property = new Property;
  leasehold: Leasehold;
  newRenterForm: any;
  titleChanged: boolean = false;
  typeChanged: boolean = false;
  phoneChanged: boolean = false;
  websiteChanged: boolean = false;
  nameChanged: boolean = false;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  propertyId: string;
  leaseholdId: string;
  makeContract: boolean = false;
  renter: Renter;

  constructor(public navController: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public dataService: DataService) {

    this.leaseholdId = this.navParams.get('leaseholdId');
    this.propertyId = this.navParams.get('propertyId');

    this.dataService.getLeasehold(this.propertyId, this.leaseholdId)
      .subscribe(leaseholdSnap => {
        this.leasehold = leaseholdSnap;
      });

    this.newRenterForm = formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      website: ['',],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  addRenterToLeasehold({propertyId, leaseholdId, value, valid }: { propertyId: string, leaseholdId: string, value: Renter, valid: boolean }) {
    this.submitAttempt = true;
    if (!this.newRenterForm.valid) {
      console.log(this.newRenterForm.value);
    } else {
      value.title = this.newRenterForm.value.title;
      value.type = this.newRenterForm.value.type;
      value.website = this.newRenterForm.value.website;
      value.phone = this.newRenterForm.value.phone;
      value.name = this.newRenterForm.value.name;
      value.email = this.newRenterForm.value.email;
      value.isActive = true;
      this.dataService.addRenterToLeasehold(this.propertyId, this.leaseholdId, value)
        .then(() => {
          this.renter = value;
          console.log(this.propertyId, this.leaseholdId, this.renter)
          this.navController.push(AddContractPage,
            {
              leaseholdId: this.leaseholdId,
              renter: value
            });
          this.makeContract = true;
        }, (error) => {
          console.log(error);
        });
    }
  }

  addContract(leaseholdId: string, renter: Renter) {
    let contract = new Contract;
    contract.leaseholdId = leaseholdId;
    contract.renter = renter;
    contract.isActive = true;
    this.dataService.addContract(contract)
      .then(() => {
        this.navController.pop();
      }, (error) => {
        console.log(error);
      });
  }

}
