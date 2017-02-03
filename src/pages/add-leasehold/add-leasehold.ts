import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data-service';

import { Property, Leasehold } from '../../models/models';

@Component({
  selector: 'page-add-leasehold',
  templateUrl: 'add-leasehold.html'
})
export class AddLeaseholdPage {

  property = new Property;
  newLeaseholdForm: any;
  titleChanged: boolean = false;
  codeChanged: boolean = false;
  sizeChanged: boolean = false;
  activeAmountChanged: boolean = false;
  submitAttempt: boolean = false;
  propertyId: string;

  constructor(public navController: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public dataService: DataService) {

    let pId = this.navParams.get('propertyId');
    this.propertyId = pId;
    this.dataService.getProperty(pId)
      .subscribe(propertySnap => {
        this.property = propertySnap;
      });

    this.newLeaseholdForm = formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      code: [''],
      size: ['', Validators.required],
      activeAmount: ['', Validators.required]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  addLeasehold({propertyId, value, valid }: { propertyId: string, value: Leasehold, valid: boolean }) {
    propertyId = this.propertyId;
    this.submitAttempt = true;
    if (!this.newLeaseholdForm.valid) {
      console.log(this.newLeaseholdForm.value);
    } else {
      value.title = this.newLeaseholdForm.value.title;
      value.type = this.newLeaseholdForm.value.type;
      value.code = this.newLeaseholdForm.value.code;
      value.size = this.newLeaseholdForm.value.size;
      value.activeAmount = this.newLeaseholdForm.value.activeAmount;
      value.isRented = false;
      this.dataService.addLeasehold(propertyId, value)
        .then(() => {
          //this.dataService.addLeaseholdToProperty(propertyId, value);
          this.navController.pop();
        }, (error) => {
          console.log(error);
        });
    }
  }

}
