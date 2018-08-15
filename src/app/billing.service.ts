import { Injectable, EventEmitter } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BillingService {

  constructor(private http: HttpClient) { }

// add rewards method
  addReward(data){
  console.log('insideService')
  console.log(data);
 let url = 'http://localhost:8585/api/addRewards';
  return this.http.post(url,data)
}

//get rewards method
getReward(){
  let url = 'http://localhost:8585/api/getRewards';
   return this.http.get(url)
 }

 // add discount method
   addDiscount(data){
   console.log('insideService')
   console.log(data);
  let url = 'http://localhost:8585/api/savediscounts';
   return this.http.post(url,data)
 }

 //get discount method
 getDiscount(){
   let url = 'http://localhost:8585/api/getdiscounts';
    return this.http.get(url)
  }

    addInvoice(data){
    console.log('insideService:addInvoice')
    console.log(data);
   let url = 'http://localhost:8585/api/createInvoice/false';
    return this.http.post(url,data)
  }

  // Receivables Service calls....
    getReceivables(mobile){
    console.log('insideService:getReceivables')
    console.log("mobile:"+mobile);
    let url = 'http://localhost:8585/api/getPayables/receivable/'+mobile;
    return this.http.get(url,mobile)
  }
  postReceivedAmount(data){
    console.log('insideService:postReceivedAmount')
    console.log("data:"+data); 
     console.log(data);
    let url = 'http://localhost:8585/api/savePayables/receivable/true';
    return this.http.post(url,data)
  }
  addReceivables(data){
    console.log('insideService:addReceivables')
    console.log("data:"+data);
       console.log(data);
    let url = 'http://localhost:8585/api/savePayables/receivable/false';
    return this.http.post(url,data)
  }

// Payables Service calls....
  getPayables(mobile){
  console.log('insideService:getPayables')
  console.log("mobile:"+mobile);
  let url = 'http://localhost:8585/api/getPayables/payable/'+mobile;
  return this.http.get(url,mobile)
}
  postPayOffAmount(data){
  console.log('insideService:postpayoffAmount')
  console.log("data:"+data);
  console.log(data);
  let url = 'http://localhost:8585/api/savePayables/payable/true';
  return this.http.post(url,data)
 }
 addPayables(data){
 console.log('insideService:addReceivables')
 console.log("data:"+data);
   console.log(data);
 let url = 'http://localhost:8585/api/savePayables/payable/false';
 return this.http.post(url,data)
}
} // BillingService End
