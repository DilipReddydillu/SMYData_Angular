import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { BillingService } from '../billing.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css']
})
export class ReceivablesComponent implements OnInit {
mobile;
userEntry;
name;
amount;
userName;
email;
address;
model;
addNew;
newReceivable ={};
  constructor(private _demoService: DataService,private billingService: BillingService,private toastr:ToastsManager) {
    this.newReceivable={invoiceNumber:'',amount:'',desc:'',mobile:''};
   }

  ngOnInit() {
    //this.model = [{date:new Date(),invoice:123123,amount:4000,received:null},{data:new Date(),invoice:123123,amount:4000,received:null}];
  }
  verifyUser(){
    this._demoService.customerExist(this.mobile).subscribe(
       data => {
         if(data != null && Object.keys(data).length<=0){
            this.userEntry = true;
         }else{
           this.name = data[0].userName;
            this.getReceivablesData(this.mobile);
          }
       },
       error => {
         this.toastr.info("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }
  userDetails(name,mail,address){
    console.log(name);
    this._demoService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
       data => {
         this.userEntry = false;
         this.model = true;
       },
       error => {
         this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
       }
    );
  }

  receiveAmount(data){
    let dataList = [];
    data.mobile = this.mobile;
    dataList.push(data);
    console.log(data)
    this.billingService.postReceivedAmount(dataList).subscribe(data => {
      if(data != null && Object.keys(data).length>=0){
        this.toastr.success("",'Success',{toastLife: '5000'});
         this.model = data[0];
      }else{
        this.toastr.error("No Records Found",'Error',{toastLife: '5000'});
       }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
    })
  }
  addReceivable(data){
    let dataList = [];
    data.mobile = this.mobile;
    dataList.push(data)
    console.log(data)
    this.billingService.addReceivables(dataList).subscribe(data => {
        this.newReceivable = {};
        this.model = data[0];
      this.toastr.success("Saved successfully",'Success',{toastLife: '5000'});
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
    })
  }
  getReceivablesData(mobile){
    this.billingService.getReceivables(mobile).subscribe(data => {
      console.log(data)
      if(data != null && Object.keys(data).length>=0){
         this.model = data[0];
      }else{
        this.toastr.error("No Records Found",'Error',{toastLife: '5000'});
       }
    },
    error => {
      this.toastr.error("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '5000'});
    })
  };

   addNewFun(){
    this.addNew = true;
  }

}
