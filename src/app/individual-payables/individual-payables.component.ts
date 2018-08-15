import { Component, OnInit } from '@angular/core';
import {IndividualService} from '../individual.service';

@Component({
  selector: 'app-individual-payables',
  templateUrl: './individual-payables.component.html',
  styleUrls: ['./individual-payables.component.css']
})
export class IndividualPayablesComponent implements OnInit {
categoryList = ['Home Loan','Home Rent', 'Power Bill', 'Groceries', 'Medical Bill', 'Personal Loan', 'Insurance', 'Others']
payableDetails = [{}];
  constructor(private service:IndividualService) { }

  ngOnInit() {
    this.getPayData();
  }
  addRow(){
    this.payableDetails.push({});
  };


  addPayData(data){
    console.log(data)
    this.service.addPayData(data).subscribe(
       data => {
         console.log('success::'+data)
       },
       error => {
         alert('error')
       }
    );
  };
  getPayData(){
    this.service.viewMyData().subscribe(
       data => {
         console.log('success::'+data)
         if(data != null && Object.keys(data).length>0){
         console.log('data::'+Object.keys(data).length)
         let obj:any = data;
         this.payableDetails = obj;
       } else {
         alert('failure')
       }
       },
       error => {
         alert('error')
       }
    );
  }
}
