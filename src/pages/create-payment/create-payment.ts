import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data-service';

import { Payment } from '../../models/models';

@Component({
  selector: 'page-create-payment',
  templateUrl: 'create-payment.html'
})
export class CreatePaymentPage {

  payment = new Payment;
  newPaymentForm: any;
  titleChanged: boolean = false;
  nameChanged: boolean = false;
  amountChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navController: NavController, public formBuilder: FormBuilder, public dataService: DataService) {
    this.newPaymentForm = formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      deptDate:['',Validators.required],
      dueDate: ['']
    })
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  createPayment({ value, valid }: { value:Payment, valid: boolean }) {
    this.submitAttempt = true;
    if (!this.newPaymentForm.valid) {
      console.log(this.newPaymentForm.value);
    } else {
      value.title=this.newPaymentForm.value.title;
      value.type=this.newPaymentForm.value.type;
      value.amount=this.newPaymentForm.value.amount;
      value.deptDate=this.newPaymentForm.value.deptDate;
      value.dueDate=this.newPaymentForm.value.dueDate;
      value.totalAmount+=this.newPaymentForm.value.amount;
      value.paid=false;
      this.dataService.createPayment(value)
        .then(() => {
          this.navController.pop();
        }, (error) => {
          console.log(error);
        });
    }
  }

}
