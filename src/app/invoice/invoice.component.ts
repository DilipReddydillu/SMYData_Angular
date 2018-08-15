import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {BillingService} from '../billing.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
name;
mobile;
email;
allCookies;
items;
total;
discount;
invoiceData;
invoiceGenerate;
subTotal:any;
  constructor(private _billingService: BillingService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.name = "David";
    this.allCookies = this.cookieService.getAll();
    this.mobile = this.allCookies.mobile;
    this.items = ['chair','bean','desk','sofa'];
  }

  public invoice:any = [{
    item:'chair', quantity:'2', rate:'450'
  },{
    item:'sofa', quantity:'1', rate:'5450'
  },{
    item:'desk', quantity:'1', rate:'1450'
  }];


  addRow(){
    this.invoice.push({
      item:'', quantity:'', rate:'',
      total:''
    });
  };

  deleteRow(index){
    this.invoice.splice(index,1);
  };


}
