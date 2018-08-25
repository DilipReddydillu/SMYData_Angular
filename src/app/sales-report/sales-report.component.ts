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
displayedColumns:any;
objData = {
  getUserDetails:['name','userMobile','email'],
  getTopCustomer:["name","userMobile","bv"],
  payable:["invoice","mobile","amount"],
  receivable:["invoice","mobile","amount"],
  getInvoice:["invoiceId","userMobile","total"],
 getTickets:["ticketId","subject","description","createDate"],
}
 dataSource: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

constructor(private _demoService: DataService,private toastr:ToastsManager) {}
  ngOnInit() {
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
    this.report = this.payable_receivable = this.tickets = this.topCustomer = this.invoiceData = "";
  //  console.log(this.displayedColumns);
    this._demoService.requestReport(obj,type).subscribe(
      data => {
        console.log(data)
         this[val] = data;
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
