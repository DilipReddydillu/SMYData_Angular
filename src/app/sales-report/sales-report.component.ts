import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';

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

 dataSource = new MatTableDataSource();
 @ViewChild(MatPaginator) paginator: MatPaginator;
   displayedColumns = ['no','name', 'mobile', 'total'];

constructor(private _demoService: DataService,private toastr:ToastsManager) {}
  ngOnInit() {
  }
  ngAfterViewInit() {
  //this.dataSource.paginator = this.paginator;
}
  request(type,val){
    let obj = {value:type,startDate:this.startDate,endDate:this.endDate};
    this.report = this.payable_receivable = this.tickets = this.topCustomer = this.invoiceData = ""
    this._demoService.requestReport(obj,type).subscribe(
      data => {
        console.log(data)
         this[val] = data;
        this.toastr.success("",'success',{toastLife: '5000'});
      },
      error => {
        this.toastr.error("Could Not fetch Data!! Try Again..",'Error',{toastLife: '5000'});
      }
    );
  } // end of request

}
