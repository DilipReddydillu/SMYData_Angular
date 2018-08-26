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

// add rewards method
  addReward(data){
  console.log('insideService')
  console.log(data);
 let url =  urlProvider + "/api/addRewards";
  return this.http.post(url,data)
}

//get rewards method
getReward(){
  let url =urlProvider +'/api/getRewards';
   return this.http.get(url)
 }

 // add discount method
   addDiscount(data){
   console.log('insideService')
   console.log(data);
  let url = urlProvider +'/api/savediscounts';
   return this.http.post(url,data)
 }

 //get discount method
 getDiscount(){
   let url = urlProvider +'/api/getdiscounts';
    return this.http.get(url)
  }

    addInvoice(data){
    console.log('insideService:addInvoice')
    console.log(data);
   let url = urlProvider +'/api/createInvoice/false';
    return this.http.post(url,data)
  }

  // Receivables Service calls....
    getReceivables(){
    console.log('insideService:getReceivables')
    let url = urlProvider +'/api/getPayables/receivable';
    return this.http.get(url)
  }
  postReceivedAmount(data){
    console.log('insideService:postReceivedAmount')
    console.log("data:"+data);
     console.log(data);
    let url = urlProvider +'/api/savePayables/receivable/true';
    return this.http.post(url,data)
  }
  addReceivables(data){
    console.log('insideService:addReceivables')
    console.log("data:"+data);
       console.log(data);
    let url = urlProvider +'/api/savePayables/receivable/false';
    return this.http.post(url,data)
  }

// Payables Service calls....
  getPayables(){
  console.log('insideService:getPayables')
  let url = urlProvider +'/api/getPayables/payable';
  return this.http.get(url)
}
  postPayOffAmount(data){
  console.log('insideService:postpayoffAmount')
  console.log("data:"+data);
  console.log(data);
  let url = urlProvider +'/api/savePayables/payable/true';
  return this.http.post(url,data)
 }
 addPayables(data){
 console.log('insideService:addReceivables')
 console.log("data:"+data);
   console.log(data);
 let url = urlProvider +'/api/savePayables/payable/false';
 return this.http.post(url,data)
}
} // BillingService End
