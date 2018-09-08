import { Injectable, EventEmitter } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {environment} from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" })
};
const urlProvider = environment.url;
const key = 'AIzaSyBFcZOIYqk_s0-qilRmve1TjMCXhYxUP3c';
console.log(environment)
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

    private indProfile = new BehaviorSubject<boolean>(false);
    indprofile = this.indProfile.asObservable();
    changeindProfile(indprofile: any) {
      console.log('indprofile:'+indprofile);
      this.indProfile.next(indprofile);
    }

    private mobileVal = new BehaviorSubject<number>(null);
    mobileTemp = this.mobileVal.asObservable();
    changeMobile(mobileTemp: any) {
      console.log('mobileTemp:'+mobileTemp);
      this.mobileVal.next(mobileTemp);
    }

    private userType = new BehaviorSubject<string>('');
    userTypeVal = this.userType.asObservable();
     changeUserType(value: any) {
       console.log('userType:'+value);
       this.userType.next(value);
     }

    private customerMobile = new BehaviorSubject<string>('');
    tempCustomerMobile = this.customerMobile.asObservable();
     changeCustomerMobile(value: any) {
       console.log('customerMobile:'+value);
       this.customerMobile.next(value);
     }

    private buPlanCss = new BehaviorSubject<string>('0');
    buPlanCssVal = this.buPlanCss.asObservable();
     changebuPlanCss(value: string) {
       this.buPlanCss.next(value);
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

    registerUserIndividual(data) {
        let body = JSON.stringify(data);
        console.log(data)
        let url =  urlProvider + '/api/saveUser/registration';
        console.log(url)
        return this.http.post(url, body, httpOptions);
    }
    registerUser(data) {
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
      let url =  urlProvider + '/api/saveBusinessUser/registration';
      return this.http.post(url, data,{headers: headers })
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
        let url =  urlProvider + '/api/loginUser';
        return this.http.post(url, data)
    }

    getLocationDetails(place) {
        console.log(place)
        // let url = 'http:postalpincode.in/api/pincode/'+place.details;
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
      let url =  urlProvider + '/api/resetPwd/'+pwd+'/'+mobile;
      return this.http.get(url, pwd )
    }
    doesUserExist(data){
      let dataObj = JSON.stringify(data);
      var url =  urlProvider + '/api/saveUser/validate';
      console.log(url);
      console.log(dataObj);
      return this.http.post(url,dataObj,httpOptions);
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
