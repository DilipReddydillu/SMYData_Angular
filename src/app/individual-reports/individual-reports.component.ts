import { Component, OnInit } from '@angular/core';
import {IndividualService} from '../individual.service';

@Component({
  selector: 'app-individual-reports',
  templateUrl: './individual-reports.component.html',
  styleUrls: ['./individual-reports.component.css']
})
export class IndividualReportsComponent implements OnInit {
reports;
  constructor(private service:IndividualService) { }

  ngOnInit() {
      this.service.getReports().subscribe(
         data => {
           console.log('success::'+data)
           if(data != null && Object.keys(data).length>0){
           console.log('data::'+Object.keys(data).length)
           let obj:any = data;
           this.reports = obj;
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
