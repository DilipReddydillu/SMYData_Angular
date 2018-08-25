import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { BillingService } from '../billing.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
customerMobile;
newReceivable ={};


dataSource: MatTableDataSource<any>;
displayedColumns = ['invoice','date','amount','receive'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private _demoService: DataService,private billingService: BillingService,private toastr:ToastsManager) {
    this.newReceivable={};
   }

  ngOnInit() {
    this._demoService.tempCustomerMobile.subscribe(customerMobile => this.customerMobile = customerMobile)
    this.getReceivablesData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getReceivablesData(){
    this.model = true;
    this.billingService.getReceivables().subscribe(data => {
      console.log(data)
      if(data != null && Object.keys(data).length>=0){
        let dataObj  = data[0]['paybleReceivables'];
        this.dataSource = new MatTableDataSource(dataObj);
        this.applyFilter(this.customerMobile);
      }else{
        this.toastr.error("No Records Found",'Error',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

  receiveAmount(data){
    console.log(data)
    this.billingService.postReceivedAmount(data).subscribe(data => {
      if(data != null && Object.keys(data).length>=0){
        this.getReceivablesData();
        this.toastr.success("",'Success',{toastLife: '3000'});
      }else{
        this.toastr.error("No Records Found",'Error',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

  addReceivable(data){
    console.log(data)
    this.billingService.addReceivables(data).subscribe(data => {
        this.newReceivable = {};
        if(data != null && Object.keys(data).length>=0){
          this.toastr.success("Saved successfully",'Success',{toastLife: '3000'});
          this.getReceivablesData();
     }
        this.addNew = false;
    },
    error => {
      this.addNew = false;
      this.newReceivable = {};
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

   addNewFun(){
    this.addNew = true;
  }

}
