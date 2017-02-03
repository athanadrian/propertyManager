import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data-service';

import { Property, Leasehold } from '../../models/models';

@Component({
  selector: 'page-create-property',
  templateUrl: 'create-property.html'
})
export class CreatePropertyPage {

  property = new Property;
  newPropertyForm: any;
  titleChanged: boolean = false;
  typeChanged: boolean = false;
  addressChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navController: NavController, public formBuilder: FormBuilder, public dataService: DataService) {
    this.newPropertyForm = formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      address: [''],
      dueDate: ['']
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  createProperty({ value, valid }: { value: Property, valid: boolean }) {
    this.submitAttempt = true;
    if (!this.newPropertyForm.valid) {
      console.log(this.newPropertyForm.value);
    } else {
      value.title = this.newPropertyForm.value.title;
      value.type = this.newPropertyForm.value.type;
      value.address = this.newPropertyForm.value.address;
      value.totalLeaseholds = 0;
      this.dataService.createProperty(value)
        .then(() => {
          this.navController.pop();
        }, (error) => {
          console.log(error);
        });
    }
  }

}
