import { Injectable, EventEmitter } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const urlProvider = window.location.origin;
const key = 'AIzaSyBFcZOIYqk_s0-qilRmve1TjMCXhYxUP3c';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    private messageSource = new BehaviorSubject<number>(12345);
    cast = this.messageSource.asObservable();

    private newBusiness = new BehaviorSubject<boolean>(false);
    newBusinessVal = this.newBusiness.asObservable();

    private editBusiness = new BehaviorSubject<boolean>(false);
    editBusinessDetails = this.editBusiness.asObservable();

    private showProfile = new BehaviorSubject<boolean>(false);
    profile = this.showProfile.asObservable();

    private userType = new BehaviorSubject<string>('');
    userTypeVal = this.userType.asObservable();

     changeUserType(value: any) {
       console.log('userType:'+value);
       this.userType.next(value);
     }

     changeProfile(profile: any) {
       console.log('profile:'+profile);
       this.showProfile.next(profile);
     }
     changeMessage(message: any) {
       console.log('message:servuce:'+message);
       this.messageSource.next(message);
     }

     isNewBusiness(value: boolean) {
       console.log('isNewBusiness:service:'+value);
       this.newBusiness.next(value);
     }

     editBusinessData(data:any){
       console.log(data)
       this.editBusiness.next(data);
     }

    registerUser(data) {
        let body = JSON.stringify(data);
        console.log(data)
        let url =  urlProvider + '/api/saveUser/registration';
        console.log(url)
        return this.http.post(url, body, httpOptions);
    }

    registerIndividual(data) {
        let body = JSON.stringify(data);
        console.log(data)
        let url =  urlProvider + '/api/saveUser/registration';
        console.log(url)
        return this.http.post(url, body, httpOptions);
    }

    addingNewBusiness(data) {
        let body = JSON.stringify(data);
        console.log(data)
        let url =  urlProvider + '/api/saveUser/add';
        console.log(url)
        return this.http.post(url, body, httpOptions);
    }

    editBusinessService(editData){
      console.log(editData)
      let url =  urlProvider + '/api/saveUser/edit';
      return this.http.post(url, editData)
    }

    viewMyBusiness(){
   let url =  urlProvider + '/api/viewMyBusiness';
    return this.http.get(url)
  }

    logInUser(data,type) {
        console.log(data)
        let url =  urlProvider + '/api/loginUser/'+type;
        return this.http.post(url, data)
    }

    getLocationDetails(place) {
        console.log(place)
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + place.details + '&key=' + key;
        return this.http.get(url)
    }

    sendOtp(number){
    console.log('In service sendOtp:: '+number)
      let url =  urlProvider + '/api/sendOtp/'+number;
      return this.http.get(url)
    }

    resetpassword(pwd,mobile){
      console.log(pwd + mobile)
      let url =  urlProvider + '/api/resetPwd/'+pwd;
      return this.http.get(url, pwd )
    }
    doesUserExist(mobile){
      var url =  urlProvider + '/api/loginUser';
      return this.http.get(url,mobile);
    }

    customerExist(mobile){
      console.log(mobile)
      var url =  urlProvider + '/api/getUserDetail/'+mobile;
      return this.http.get(url,mobile);
    }

    createUser(data){
      console.log(data)
      var url =  urlProvider + '/api/saveUser';
      return this.http.post(url,data);
    }
    createTicket(data){
      console.log(data)
      var url =  urlProvider + '/api/createTicket';
      return this.http.post(url,data);
    }
    requestReport(data,type){
    console.log('Innn service strtDate: '+data.startDate +' endDate:'+data.endDate);
      console.log(data)
      var url =  urlProvider + '/api/'+type+'/'+data.startDate+'/'+data.endDate;
      console.log(url)
      return this.http.get(url,data);
    }

}
