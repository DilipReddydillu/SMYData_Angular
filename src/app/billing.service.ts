import { Injectable, EventEmitter } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {environment} from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const urlProvider = environment.url;


@Injectable()
export class BillingService {
  constructor(private http: HttpClient) { }

  private businessId = new BehaviorSubject<any>('');
  buListData = this.businessId.asObservable();
   changeBusinessList(data) {
     this.businessId = data
     console.log(this.businessId)
   }

// add rewards method
  addReward(data){
 let url =  urlProvider + "/api/addRewards"+this.businessId;
  return this.http.post(url,data)
}

//get rewards method
getReward(){
  let url =urlProvider +'/api/getRewards'+this.businessId;
   return this.http.get(url)
 }

 // add discount method
   addDiscount(data){
  let url = urlProvider +'/api/savediscounts'+this.businessId;
   return this.http.post(url,data)
 }

 //get discount method
 getDiscount(){
   let url = urlProvider +'/api/getdiscounts'+this.businessId;
    return this.http.get(url)
  }

    addInvoice(data){
   let url = urlProvider +'/api/createInvoice/false'+this.businessId;
    return this.http.post(url,data)
  }

  // Receivables Service calls....
    getReceivables(){
    let url = urlProvider +'/api/getPayables/receivable'+this.businessId;
    return this.http.get(url)
  }
  postReceivedAmount(data){
    let url = urlProvider +'/api/savePayables/receivable/true'+this.businessId;
    return this.http.post(url,data)
  }
  addReceivables(data){
    let url = urlProvider +'/api/savePayables/receivable/false'+this.businessId;
    return this.http.post(url,data)
  }

// Payables Service calls....
  getPayables(){
  let url = urlProvider +'/api/getPayables/payable'+this.businessId;
  return this.http.get(url)
}
  postPayOffAmount(data){
  let url = urlProvider +'/api/savePayables/payable/true'+this.businessId;
  return this.http.post(url,data)
 }
 addPayables(data){
 let url = urlProvider +'/api/savePayables/payable/false'+this.businessId;
 return this.http.post(url,data)
}
} // BillingService End
