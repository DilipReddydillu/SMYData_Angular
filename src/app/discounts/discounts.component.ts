import { Component, OnInit } from '@angular/core';
import {BillingService} from '../billing.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  constructor(private _billingService: BillingService, private dataService:DataService) { }

  ngOnInit() {
    this.getDiscount();
    this.dataService.changebuPlanCss("55");
  }

  isDataExist:boolean = false;
  discounts:any = [{
    enable:false, minAmount:'', maxAmount:'',
    startDate:'', endDate:'', enableDiscount:false
  }];

  addRow(){
    this.discounts.push({});
  };

  deleteRow(index){
    this.discounts.splice(index,1);
  };

  //on save function call
  saveDiscount(data){
    this.addingDiscount(data); // function call to save the data
  }

  // function call to save the data
  addingDiscount(discountData){
  console.log(discountData);
  //calling addDiscount method which is inside the billing.service to save the discounts data
    this._billingService.addDiscount(discountData).subscribe(
       data => {
         console.log('success::'+data)
       },
       error => {
       }
    );
  };
  // function call to get the Discount data
  getDiscount(){
  //calling getDiscount method which is inside the billing.service to fetch the discounts data
    this._billingService.getDiscount().subscribe(
       data => {
         console.log('success::'+data)
         if(data != null && Object.keys(data).length>0){
         console.log('data::'+Object.keys(data).length)
         this.isDataExist = true
         this.discounts = data;
       } else {
         console.log('failure')
       }
       },
       error => {
         console.log('error')
       }
    );
  }

}
