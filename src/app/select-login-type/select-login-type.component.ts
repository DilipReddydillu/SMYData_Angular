import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-select-login-type',
  templateUrl: './select-login-type.component.html',
  styleUrls: ['./select-login-type.component.css']
})
export class SelectLoginTypeComponent implements OnInit {
  view = true;
  constructor(private service:DataService, private router:Router) { }

  ngOnInit() {
  }
selectUser(type){
  this.service.changeUserType(type);
  this.router.navigate(['/', 'signIn']);
}
}
