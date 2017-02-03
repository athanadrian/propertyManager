import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Payment, Property, Leasehold, Renter, Contract } from '../models/models';

@Injectable()
export class PaymentService {

  paymentList: FirebaseListObservable<Payment[]>;
  propertyList: FirebaseListObservable<Property[]>;
  leaseholdList: FirebaseListObservable<Leasehold[]>;
  contractList: FirebaseListObservable<Contract[]>;
  propertyLeaseholdsList: FirebaseListObservable<any>;
  paymentDetail: FirebaseObjectObservable<Payment>;
  propertyDetail: FirebaseObjectObservable<Payment>;
  leaseholdDetail: FirebaseObjectObservable<Leasehold>;
  renterDetail: FirebaseObjectObservable<Renter>;
  contractListDetail: FirebaseObjectObservable<Renter>;
  userId: string;
  propertyId: string;

  constructor(public af: AngularFire) {
    af.auth.subscribe((auth) => {
      if (auth) {
        this.paymentList = af.database.list(`/userProfile/${auth.uid}/paymentList/`);
        this.propertyList = af.database.list(`/userProfile/${auth.uid}/propertyList/`);
        //this.leaseholdList = af.database.list(`/userProfile/${auth.uid}/leaseholdList/`);
        this.propertyLeaseholdsList = af.database.list(`/userProfile/${auth.uid}/property-leaseholds/`);
        this.contractList = af.database.list(`/userProfile/${auth.uid}/contractList/`);
        this.userId = auth.uid;
      }
    });
  }

}
