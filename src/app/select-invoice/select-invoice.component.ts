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
credit;discountList;
InvGen:boolean;
gst;invoiceid;
totalPayable;totalReceivable
public pattern_mobile = /^\d{10}$/;

  constructor(private _demoService: DataService,private _billingService: BillingService,private toastr:ToastsManager) {
}

  ngOnInit() {
    this._demoService.changebuPlanCss("0");
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
    this.discounts = 0;
    if(data && data.length > 0){
      data.forEach(val => {
        if((subTotal <= val.maxAmount && subTotal >= val.minAmount) || subTotal > val.minAmount){
          this.discounts = this.discounts < val.discount ? val.discount : this.discounts;
        }
      });
    }
  }
  verifyUser(){
    this._demoService.changeCustomerMobile(this.mobile);
    if (!this.pattern_mobile.test(this.mobile)) {
            this.toastr.error("Please enter valid mobile number", 'Error',[{toastLife: '2000'},{dismiss: 'click'},{maxShown:'1'}]);
            this.mobile = '';
      }else{
        this.toastr.clearAllToasts();
    this._demoService.customerExist(this.mobile).subscribe(
       data => {
         if(data != null && Object.keys(data).length<=0){
           this.userEntry = true;
         }else{
           console.log(data)
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
        console.log("ERROR: Could not connect!!")
        this.toastr.info("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }
  }

  userDetails(){
    console.log(name);
    this._demoService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
       data => {
         console.log(data)
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
         console.log('failed to add');
         this.toastr.error("Could Not Add Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }

  submitInvoice(){
    let generateInvoice = {
      userName:this.userName,userMobile:this.mobile,total:this.total,
      subTotal:this.subTotal,rewards:this.rewards,discount:this.discounts,
      credit:this.credit, invoiceDetail:this.invoiceList
      }
    console.log(generateInvoice);
    this._billingService.addInvoice(generateInvoice).subscribe(
      data => {
          console.log(data)
          if(data != null){
          this.invoiceid = data[0].invId;
          this.InvGen = true;
          }else{
             this.invoice = this.userEntry = false;
          }
        },
       error => {
         console.log('could not create Invoice! try again!!')
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
