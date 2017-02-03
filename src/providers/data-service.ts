import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Payment, Property, Leasehold, Renter, Contract } from '../models/models';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

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

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.af.database.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  getPaymentList(): FirebaseListObservable<Payment[]> {
    return this.paymentList;
  }

  getPropertyList(): FirebaseListObservable<Property[]> {
    return this.propertyList;
  }

  getLeaseholdList(propertyId): FirebaseListObservable<Leasehold[]> {
    this.leaseholdList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList`);
    return this.leaseholdList;
  }

  getRenterList(propertyId: string, leaseholdId: string): FirebaseListObservable<Renter[]> {
    let renterList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList/${leaseholdId}/renterList/`);
    return renterList;
  }

  getPropertyLeaseholdsList(propertyId: string) {
    this.propertyLeaseholdsList = this.af.database.list(`/userProfile/${this.userId}/property-leaseholds/${propertyId}/leaseholdList/`);
    return this.propertyLeaseholdsList;
  }

  getContractList(): FirebaseListObservable<Contract[]> {
    return this.contractList;
  }

  getPayment(paymentId: string): FirebaseObjectObservable<Payment> {
    return this.paymentDetail =
      this.af.database.object(`/userProfile/${this.userId}/paymentList/${paymentId}/`);
  }

  getContract() {
    return this.contractListDetail = 
      this.af.database.object(`/userProfile/${this.userId}/contractList/`);
  }

  getProperty(propertyId: string): FirebaseObjectObservable<Property> {
    return this.propertyDetail =
      this.af.database.object(`/userProfile/${this.userId}/propertyList/${propertyId}/`);
  }

  getLeasehold(propertyId: string, leaseholdId: string): FirebaseObjectObservable<Leasehold> {
    return this.leaseholdDetail =
      this.af.database.object(`/userProfile/${this.userId}/propertyList/${propertyId}/${leaseholdId}/`)
  }

  getRenter(propertyId: string, leaseholdId: string, renterId: string): FirebaseObjectObservable<Leasehold> {
    return this.renterDetail =
      this.af.database.object(`/userProfile/${this.userId}/propertyList/${propertyId}/${leaseholdId}/renterList/${renterId}`)
  }

  addLeasehold(propertyId: string, leasehold: Leasehold) {
    let leaseholdList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList`)
    return leaseholdList.push(leasehold).then((newLeasehold) => {
      let value:number;
      this.getProperty(propertyId).subscribe((property)=>{
        value=property.totalLeaseholds;
      });
      this.getProperty(propertyId).update({totalLeaseholds:this.increaseTotalLeaseholds(value)});
      let leaseholds = this.af.database.list(`/userProfile/${this.userId}/property-leaseholds/${propertyId}/leaseholdList/`);
      leaseholds.push({ leasehold: newLeasehold.key });
    });
  }

  increaseTotalLeaseholds(value:number):number{
    return value+=1;
  }

  rentLeasehold(propertyId: string, leaseholdId: string) {
    let leaseholdList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList`);
    return leaseholdList.update(leaseholdId, { isRented: true })
  }

  releaseLeasehold(leaseholdId:string, propertyId: string, renterId: string){
    //contractList -> contract.isActive=false
    //renterList -> renter.isActive=false
    //leaseholdList -> leasehold.isRented=false
  }

  createPayment(payment: Payment) {
    return this.paymentList.push(payment);
  }

  createProperty(property: Property) {
    return this.propertyList.push(property);
  }

  addRenterToLeasehold(propertyId: string, leaseholdId: string, renter: Renter) {
    let renterList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList/${leaseholdId}/renterList/`);
    return renterList.push(renter);
  }

  addContract(contract: Contract) {
    this.contractList = this.af.database.list(`/userProfile/${this.userId}/contractList/`);
    return this.contractList.push(contract);
  }

  payPayment(paymentId: string) {
    return this.paymentList.update(paymentId, { paid: true, paidDate: Date() });
  }

  editPropery(propertyId: string) {
    return this.propertyList.update(propertyId, { editProperty: Property })
  }

  removePayment(paymentId: string) {
    return this.paymentList.remove(paymentId);
  }

  removeProperty(propertyId: string) {
    return this.propertyList.remove(propertyId);
  }

  removeLeasehold(propertyId: string, leaseholdId: string) {
    this.leaseholdList = this.af.database.list(`/userProfile/${this.userId}/propertyList/${propertyId}/leaseholdList`);
    return this.leaseholdList.remove(leaseholdId);
  }

}
