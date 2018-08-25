import { Injectable, EventEmitter } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {environment} from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const urlProvider = window.location.origin;
const urlProvider = environment.url;


@Injectable()
export class IndividualService {

  constructor(private http: HttpClient) {}

  addPayData(data) {
      let body = JSON.stringify(data);
      console.log(data)
      let url =  urlProvider + '/api/payable/add';
      console.log(url)
      return this.http.post(url, body, httpOptions);
  }

  viewMyData(){
 let url =  urlProvider + '/api/viewMyData';
  return this.http.get(url)
}

  addReceiveData(data) {
      let body = JSON.stringify(data);
      console.log(data)
      let url =  urlProvider + '/api/receivable/add';
      console.log(url)
      return this.http.post(url, body, httpOptions);
  }

  getReceiveData(){
 let url =  urlProvider + '/api/getReceiveData';
  return this.http.get(url)
}
  getReports(){
 let url =  urlProvider + '/api/getReports';
  return this.http.get(url)
}

}
