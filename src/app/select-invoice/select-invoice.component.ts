import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {BillingService} from '../billing.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
  styleUrls: ['./select-invoice.component.css']
})
export class SelectInvoiceComponent implements OnInit {
mobile;invoice;userEntry;
userName;email;address;
invoiceData;invoiceList;
items;total;subTotal;
rewards;discounts;
BV;rewardPoints;
credit=0;discountList;
InvGen:boolean;
gst;invoiceid;
totalPayable;totalReceivable
public pattern_mobile = /^\d{10}$/;

  constructor(private _dataService: DataService,private _billingService: BillingService,private toastr:ToastsManager) {
}

  ngOnInit() {
    this._dataService.changebuPlanCss("0");
    this.rewards =  this.discounts = 0;
    this.invoiceList = [{
      item:'', quantity:'', rate:'',total:''
    }];
    this.items = ['chair','bean','desk','sofa'];
    this.invoiceData = {name:'',mobile:'',email:''}
    this.gst = 8;

  }
  addRow(){
    this.invoiceList.push({
      item:'', quantity:'', rate:'',total:''
    });
  };

  deleteRow(index){
    this.invoiceList.splice(index,1);
  };
  calcTotal(){
      this.total = this.subTotal = 0;
      this.invoiceList.forEach(value => {
      if(value.rate != null && value.quantity !=null){
      this.subTotal += value.rate * value.quantity;
      this.applyDiscount(this.discountList,this.subTotal);
    }else{
      this.subTotal = 0;
    }
    });
    this.total = this.subTotal - this.rewards - (this.subTotal * ((this.discounts)/100));
    this.total = this.total + (this.total * (this.gst/100));

  }
  applyDiscount(data,subTotal){
    let dicountTemp = this.discounts;
    this.discounts = 0;
    if(data && data.length > 0){
      data.forEach(val => {
        if((subTotal <= val.maxAmount && subTotal >= val.minAmount) || subTotal > val.minAmount){
          this.discounts = this.discounts < val.discount ? val.discount : this.discounts;
        }
      });
    }
    this.discounts = this.discounts > 0 ? this.discounts : dicountTemp;
  }
  verifyUser(){
    this._dataService.changeCustomerMobile(this.mobile);
    if (!this.pattern_mobile.test(this.mobile)) {
            this.toastr.error("Please enter valid mobile number", 'Error',[{toastLife: '2000'},{dismiss: 'click'},{maxShown:'1'}]);
            this.mobile = '';
      }else{
        this.toastr.clearAllToasts();
    this._dataService.customerExist(this.mobile).subscribe(
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
         this.discountList = data[0].discounts;
         this.totalPayable = data[0].totalPayable;
         this.totalReceivable = data[0].totalReceivable;
       }
       },
       error => {
        this.toastr.info("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }
  }

  userDetails(){
    this._dataService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
       data => {
         this.invoice = true;
         this.userName = data[0].userName;
         this.email = data[0].email;
         this.address = data[0].address;
         this.BV = data[0].businessVolume;
         this.rewardPoints = data[0].rewardPoints;
         this.discountList = data[0].discounts;
         this.totalPayable = data[0].totalPayable;
         this.totalReceivable = data[0].totalReceivable;
       },
       error => {
         this.toastr.error("Could Not Add Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }

  submitInvoice(){
    let invoice = {
      userName:this.userName,userMobile:this.mobile,total:this.total,
      subTotal:this.subTotal,rewards:this.rewards,discount:this.discounts,
      credit:this.credit, invoiceDetail:this.invoiceList
      }
    this._billingService.addInvoice(invoice).subscribe(
      data => {
          if(data != null){
            console.log(data);
            console.log(JSON.stringify(data))
          this.invoiceid = data[0].invId;
          this.InvGen = true;
          this._dataService.changeInvoiceData(data)
          }else{
             this.invoice = this.userEntry = false;
          }
        },
       error => {
         this.toastr.error("Could Not Generate!! Try Again..",'Error',{toastLife: '5000'});
       }
    );

  }

  imageUrl(){
    if (this.BV < 2000) {
        return "../../assets/images/bronze.jpg";
    } else if(this.BV > 2000 && this.BV < 6000){
      return "../../assets/images/silver.jpg";
    }
    else{
      return "../../assets/images/image1.jpg";
    }
  }

}
