import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {BillingService} from '../billing.service';

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
  styleUrls: ['./select-invoice.component.css']
})
export class SelectInvoiceComponent implements OnInit {
mobile;
invoice;
userEntry;
userName;
email;
address;
invoiceData;
invoiceList;
items;
total;
subTotal;
rewards;
discounts;
BV;
rewardPoints;

  constructor(private _demoService: DataService,private _billingService: BillingService) {
}

  ngOnInit() {
    this.rewards =  this.discounts = 0;
    this.invoiceList = [{
      item:'', quantity:'', rate:'',total:''
    }];
    this.items = ['chair','bean','desk','sofa'];
    this.invoiceData = {name:'',mobile:'',email:''}
  }
  addRow(){
    this.invoiceList.push({
      item:'', quantity:'', rate:'',total:''
    });
  };

  deleteRow(index){
    this.invoiceList.splice(index,1);
  };
  calcTotal(r){
      this.total = this.subTotal = 0;
    this.invoiceList.forEach(value => {
      if(value.rate != null && value.quantity !=null){
      this.subTotal += value.rate * value.quantity;
    };
    });
    this.total = this.subTotal - this.rewards - (this.subTotal * (this.discounts/100));
  }
  verifyUser(){
    this._demoService.customerExist(this.mobile).subscribe(
       data => {
         if(data != null && Object.keys(data).length<=0){
           this.userEntry = true;
         }else{
         this.invoice = true;
         this.userName = data[0].userName;
         this.email = data[0].email;
         this.address = data[0].address;
         this.BV = data[0].businessVolume;
         this.rewardPoints = data[0].rewardPoints;
       }
       },
       error => {
       }
    );
  }

  userDetails(){
    console.log(name);
    this._demoService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
       data => {
         this.invoice = true;
       },
       error => {
       }
    );
  }

  submitInvoice(){
    let generateInvoice = {
      userName:this.userName,userMobile:this.mobile,total:this.total,
      subTotal:this.subTotal,rewards:this.rewards,discount:this.discounts,invoiceDetail:this.invoiceList
      }
    console.log(generateInvoice);
    this._billingService.addInvoice(this.invoice).subscribe(
       data => {
         console.log('success::'+data)
         this.invoice = this.userEntry = false;
       },
       error => {
       }
    );

  }

}
