import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { BillingService } from '../billing.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


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
customerMobile;

dataSource: MatTableDataSource<any>;
displayedColumns = ['invoice','date','amount','payoff'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private _demoService: DataService,private billingService: BillingService,private toastr:ToastsManager) {
    this.newPayable={invoiceNumber:'',amount:'',desc:'',mobile:''};
  }
  ngOnInit() {
    this._demoService.tempCustomerMobile.subscribe(customerMobile => this.customerMobile = customerMobile)
    this.getPayablesData();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getPayablesData(){
    this.model = true;
    this.billingService.getPayables().subscribe(data => {
      console.log('getPayablesData:'+ JSON.stringify(data))
      if(data != null && Object.keys(data).length>=0){
         let dataObj = data[0]['paybleReceivables'];
         console.log(dataObj)
         this.dataSource = new MatTableDataSource(dataObj);
         this.applyFilter(this.customerMobile);
         if(data[0] == null)
         this.model = true;
      }else{
        this.toastr.error("No Records Found",'Error',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  };

  payAmount(data){
    console.log(data)
    this.billingService.postPayOffAmount(data).subscribe(data => {
      if(data != null && Object.keys(data).length>=0){
        this.toastr.success("",'Success',{toastLife: '3000'});
        this.getPayablesData()
      }else{
        this.toastr.error("Something Went Wrong, Please Try Again ",'Error',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

  addPayable(data){
    console.log(data)
    this.billingService.addPayables(data).subscribe(data => {
        this.newPayable = {};
         if(data != null && Object.keys(data).length>=0){
           this.toastr.success("Saved successfully",'Success',{toastLife: '3000'});
           this.getPayablesData();
      }
      this.addNew = false;
    },
    error => {
      this.addNew = false;
      this.newPayable = {};
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

    addNewFun(){
    this.addNew = true;
  }

}
