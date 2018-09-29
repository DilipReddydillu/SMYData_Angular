import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
startDate:Date;
endDate:Date;
report:any;
payable_receivable:any;
tickets:any;
topCustomer:any;
invoiceData:any;
topCustomerRecords = 3;
displayedColumns:any;data;
objData = {
  getUserDetails:['name','userMobile','email'],
  getTopCustomer:["name","userMobile","bv"],
  payable:["invoice","mobile","amount"],
  receivable:["invoice","mobile","amount"],
  getInvoice:["invoiceId","userMobile","total"],
 getTickets:["ticketId","subject","description","createDate"],
}
getUserDetails:{
   name: {title: 'Name' },
   userMobile: {title: 'Mobile'},
  email: { title: 'Email' },
};
getTopCustomer:{
  name: {title: 'Name' },
  userMobile: {title: 'Mobile'},
 bv: { title: 'BV' },
};
pay_rcv:{
  invoiceId: {title: 'InvoiceId' },
  userMobile: {title: 'Mobile'},
 total: { title: 'Total' },
};
getInvoice:{
  invoice: {title: 'Invoice' },
  mobile: {title: 'Mobile'},
 amount: { title: 'Amount' },
};
getTickets:{
  ticketId: {title: 'Id' },
  subject: {title: 'Subject'},
 description: { title: 'Description' },
 createDate: { title: 'Date' },
};
 dataSource: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 settings = {
   actions: {
     add: false,
     edit: false,
     delete: false,
   },
    columns: {}
 };
constructor(private _demoService: DataService,private toastr:ToastsManager) {}
  ngOnInit() {
    this._demoService.changebuPlanCss("0");
  }
  ngAfterViewInit() {
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
  request(type,val){
    let obj = {value:type,startDate:this.startDate,endDate:this.endDate};
    this.displayedColumns = this.objData[type];
    this.settings.columns = this[type];
    this.report = this.payable_receivable = this.tickets = this.topCustomer = this.invoiceData = "";
    this._demoService.requestReport(obj,type).subscribe(
      data => {
         this[val] = data;
         this.data = data;
         this.dataSource = new MatTableDataSource(this[val]);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
        // this.toastr.success("",'success',{toastLife: '5000'});
      },
      error => {
        this.toastr.error("Could Not fetch Data!! Try Again..",'Error',{toastLife: '5000'});
      }
    );
  } // end of request
rowCheck(data,index){
if(this.displayedColumns.length > 0){
  let fieldExist;
  fieldExist = this.displayedColumns.indexOf(data) >= 0 ? true : false;
  return fieldExist;
}
}
}
