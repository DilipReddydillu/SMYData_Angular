import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {
subject:string;
description:string;

constructor(private _demoService: DataService,private toastr:ToastsManager) {}
  ngOnInit() {
  }
submit(){
  this._demoService.createTicket({subject:this.subject,description:this.description}).subscribe(
    data => {
      this.toastr.success("Request Sent",'success',{toastLife: '5000'});
      this.subject=this.description = "";
    },
    error => {
      this.subject=this.description = "";
      this.toastr.error("Could Not Save Data!! Try Again..",'Error',{toastLife: '5000'});
    }
  );
}
}
