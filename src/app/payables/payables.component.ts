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
data;
dataSource: MatTableDataSource<any>;
displayedColumns = ['invoice','mobile','date','amount','payoff'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
settings = {
  actions: {
    add: false,
    edit: false,
    delete: false,
  },
   columns: {
   invoiceNumber: {
     title: 'Invoice'
   },
   mobile: {
     title: 'Mobile'
   },
   createDate: {
     title: 'Date'
   },
   amount: {
     title: 'Amount'
   }
 }
};
  constructor(private _demoService: DataService,private billingService: BillingService,private toastr:ToastsManager) {
    this.newPayable={invoiceNumber:'',amount:'',desc:'',mobile:''};
  }
  ngOnInit() {
    this._demoService.changebuPlanCss("0");
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
      if(data != null){
        if(data[0] && data[0]['paybleReceivables'].length > 0){
         let dataObj = data[0]['paybleReceivables'];
           this.data = dataObj;
         this.dataSource = new MatTableDataSource(dataObj);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         this.applyFilter(this.customerMobile);
       }else{
         this.dataSource = new MatTableDataSource([]);
       }
      }else{
        this.dataSource = new MatTableDataSource([]);
        this.toastr.info("No Records Found",'Info',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Fetch Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  };

  payAmount(data){
    let arrList = [data]
    this.customerMobile = "";
    this.billingService.postPayOffAmount(arrList).subscribe(data => {
      if(data){
        this.toastr.success("",'Success',{toastLife: '3000'});
        this.customerMobile = "";
        this.getPayablesData()
      }else{
        this.getPayablesData()
        this.toastr.info("No Records Found ",'Info',{toastLife: '3000'});
       }
    },
    error => {
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '3000'});
    })
  }

  addPayable(data){
    let arrList = [data];
    this.customerMobile = "";
    this.billingService.addPayables(arrList).subscribe(data => {
        this.newPayable = {};
         if(data != null && Object.keys(data).length>=0){
           this.toastr.success("Saved successfully",'Success',{toastLife: '3000'});
           this.customerMobile = "";
           this.getPayablesData();
      }else{
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
