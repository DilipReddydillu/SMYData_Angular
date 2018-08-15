import { Component, OnInit } from '@angular/core';
import {IndividualService} from '../individual.service';

@Component({
  selector: 'app-individual-receivables',
  templateUrl: './individual-receivables.component.html',
  styleUrls: ['./individual-receivables.component.css']
})
export class IndividualReceivablesComponent implements OnInit {

receivableDetails = [{}];
  constructor(private service:IndividualService) { }

  ngOnInit() {
    this.getReceiveData();
  }
  addRow(){
    this.receivableDetails.push({});
  };


  addReceiveData(data){
    console.log(data)
    this.service.addReceiveData(data).subscribe(
       data => {
         console.log('success::'+data)
       },
       error => {
         alert('error')
       }
    );
  };
  getReceiveData(){
    this.service.getReceiveData().subscribe(
       data => {
         console.log('success::'+data)
         if(data != null && Object.keys(data).length>0){
         console.log('data::'+Object.keys(data).length)
         let obj:any = data;
         this.receivableDetails = obj;
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
