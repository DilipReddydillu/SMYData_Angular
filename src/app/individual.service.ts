import { Injectable, EventEmitter } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class IndividualService {

  constructor(private http: HttpClient) {}

  addPayData(data) {
      let body = JSON.stringify(data);
      console.log(data)
      let url = 'http://localhost:8585/api/payable/add';
      console.log(url)
      return this.http.post(url, body, httpOptions);
  }

  viewMyData(){
 let url = 'http://localhost:8585/api/viewMyData';
  return this.http.get(url)
}

  addReceiveData(data) {
      let body = JSON.stringify(data);
      console.log(data)
      let url = 'http://localhost:8585/api/receivable/add';
      console.log(url)
      return this.http.post(url, body, httpOptions);
  }

  getReceiveData(){
 let url = 'http://localhost:8585/api/getReceiveData';
  return this.http.get(url)
}
  getReports(){
 let url = 'http://localhost:8585/api/getReports';
  return this.http.get(url)
}

}
