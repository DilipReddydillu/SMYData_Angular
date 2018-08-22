import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { BillingService } from '../billing.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-payables',
  templateUrl: './payables.component.html',
  styleUrls: ['./payables.component.css']
})
export class PayablesComponent implements OnInit {
mobile;
userEntry;
name;
amount;
userName;
email;
address;
newPayable;
model;
addNew;
public pattern_mobile = /^\d{10}$/;

  constructor(private _demoService: DataService,private billingService: BillingService,private toastr:ToastsManager) {
    this.newPayable={invoiceNumber:'',amount:'',desc:'',mobile:''};
  }

  ngOnInit() {
  }
  verifyUser(){
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
              this.name = data[0].userName;
              this.getPayablesData(this.mobile);
            }
          },
          error => {
            this.toastr.info("Could Not Fetch Data!! Try Again..",'Error',[{toastLife: '2000'},{dismiss: 'click'}]);
          }
        );
  }
  }

  userDetails(name,mail,address){
    this._demoService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
      data => {
        this.userEntry = false;
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
    this.billingService.postReceivedAmount(data).subscribe(data => {
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

  getPayablesData(mobile){
    this.model = true;
    this.billingService.getPayables(mobile).subscribe(data => {
      console.log('getPayablesData:'+ data)
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

  payAmount(data){
    let dataList = [];
    data.mobile = this.mobile;
    dataList.push(data);
    console.log(data)
    this.billingService.postPayOffAmount(dataList).subscribe(data => {
      if(data != null && Object.keys(data).length>=0){
        this.toastr.success("",'Success',{toastLife: '5000'});
         this.model = data[0];
      }else{
        this.toastr.error("Something Went Wrong, Please Try Again ",'Error',{toastLife: '5000'});
       }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
    })
  }

  addPayable(data){
    let dataList = [];
    data.mobile = this.mobile;
    dataList.push(data)
    console.log(data)
    this.billingService.addPayables(dataList).subscribe(data => {
        this.newPayable = {};
         if(data != null && Object.keys(data).length>=0){
      this.toastr.success("Saved successfully",'Success',{toastLife: '5000'});
         this.model = data[0];
      }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
    })
  }

    addNewFun(){
    this.addNew = true;
  }

}
