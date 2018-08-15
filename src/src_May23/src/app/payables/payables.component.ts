import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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

  constructor(private _demoService: DataService) {}

  ngOnInit() {
  }
  verifyUser(){
    this._demoService.customerExist(this.mobile).subscribe(
       data => {
         this.name = data[0].name;
         this.amount = data[0].amount;
       },
       error => {
        this.userEntry = true;
       }
    );
  }

  userDetails(){
    this._demoService.createUser({name:this.userName,email:this.email,address:this.address}).subscribe(
       data => {
       },
       error => {
       }
    );
  }

}
