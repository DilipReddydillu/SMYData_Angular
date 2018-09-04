import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataComponent} from '../user-data/user-data.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  categoryInfo = [{
          name: 'Clothing',
          id: '1'
      },
      {
          name: 'Furniture',
          id: '2'
      },
      {
          name: 'Fashion Jewellery',
          id: '3'
      },
      {
          name: 'Valves',
          id: '4'
      },
      {
          name: 'Computer Hardware',
          id: '5'
      },
  ];
  registerInfo = [{
          name: 'PanCard',
          id: '1'
      },
      {
          name: 'Aadhar',
          id: '2'
      },
      {
        name: 'TIN',
        id: '3'
      }
  ];

  submitted = false;
  showAddr = false;
  registrationFailed =null;
  latlng:any;
  mobileOTP:any;
  addNewBusinessForm:boolean;
  formSubmitName:String = 'Register';
  formTitle : String = 'Registration Form';
  businessEditableForm:any;
  addNew:boolean;
  mobilecheck:boolean;
  patternErr:string;
  showbusinessList:boolean;
  businessList:any;
  idProofErrMsg:string;
  maxLn:number;
  showAddrMsg = false;
  public pattern_pinCode = /^\d{3,7}$/;
  business =true;
  focusFname;
  focusBuName;focusOwnerName;focusMobile;focusPassword;focusCnfPassword;focusWebsite;
  focusEmail;focusBuAddr;focusCountry;focusState;focusCity;focusregDetails;
  public model = {
    "role":"business",
      "registrationId": '',
      "ownerName": "",
      "mobile": "",
      "password": "",
      "email": "",
      "businessDetails": [
          {
              "companyName": "",
              "businessAddress": "",
              "pinCode": "",
              "city": "",
              "state": "",
              "country": "",
              "website": "",
              "category": "",
              "regProof": "",
              "reg": "",
              "businessDetailId": ''
          }
      ]
  };
  public individual = {"role":"individual", "ownerName":"","lastName": "", "mobile": "", "password": "", "email": "",}
  constructor(private _demoService: DataService, private router: Router,  private toastr:ToastsManager) {
        }

  ngOnInit() {
  }

 onSubmit(dataJson){
   this.getLocation();
         this.mobileOTP = dataJson.mobile;
         this._demoService.changeMobile(this.mobileOTP);
       this._demoService.registerUser(dataJson).subscribe(
           data => {
                 if (data[0] == 'success') {
                   this.sendOtp(this.mobileOTP )
                   return true;
                 }else{
                   this.toastr.error(data[0], 'Error',{toastLife: '5000'});
                 }
           },
           error => {
               console.error("Error saving data!");
               this.registrationFailed = 'Registration failed';
               this.toastr.error('Registration failed', 'Error',{toastLife: '5000'});
               return Observable.throw(error);
           }
       );
 }
 sendOtp(mobileNum){
       this.router.navigate(['/', 'otpVerification']);
       this._demoService.sendOtp(mobileNum).subscribe(
          data => {
            this._demoService.changeMessage(data+'Regi')
          },
          error => {
          }
       );
 }
  doesUserExist(obj){
    this.mobilecheck = false;
    this._demoService.doesUserExist(obj).subscribe(
       data => {
         if (data) {
           console.log(data)
           this.model.mobile = null;
           this.mobilecheck = true;
         }
       },
       error => {
       }
    );
  }

  addressDetails(data) {
      let JsonData = {details: data};
      this._demoService.getLocationDetails(JsonData).subscribe(
          data => {
              this.locDeatils(data);
              return true;
          },
          error => {
              return Observable.throw(error);
          }
      );
  }
  locDeatils(data){
    console.log(data)
      this.model.businessDetails[0].country =   this.model.businessDetails[0].city=   this.model.businessDetails[0].state=""
    if (data && data.results.length > 0 && data.results[0].formatted_address != undefined && data.status != "ZERO_RESULTS") {
      var addrDataArr= data.results[0].formatted_address.split(',');
        this.model.businessDetails[0].country = addrDataArr[addrDataArr.length - 1].trim();
        this.model.businessDetails[0].state = addrDataArr[addrDataArr.length - 2].trim();
        this.model.businessDetails[0].city = addrDataArr[addrDataArr.length - 3].trim();
        this.showAddr = true;
        this.showAddrMsg = false;
    }else{
      this.showAddrMsg = true;
      this.showAddr = true;
    }
  }

  idProofValidate(proof,id){
    console.log(proof+id)
    this.registerInfo.forEach(function(val){
      if (val.id == proof) proof = val.name;
    })

    switch(proof){
      case "PanCard":
      console.log(!/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/.test(id))
          if (!/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/.test(id)){
            this.model.businessDetails[0].regProof = "";
            this.idProofErrMsg = "Please enter valid PanCard number! Ex: AFCDE1234K";
            this.maxLn = 10;
          }
            break;
      case "Aadhar":
          if (!/^\d{12}$/.test(id)){
            this.model.businessDetails[0].regProof = "";
            this.idProofErrMsg = "Please enter valid Aadhar number! Should contain 12 digits";
            this.maxLn = 12;
          }
            break;
      case "TIN":
          if (!/^\d{11}$/.test(id)){
            this.model.businessDetails[0].regProof = "";
            this.idProofErrMsg = "Please enter valid TIN number! Should contain 11 digits";
            this.maxLn = 11;
          }
    }
  }

  focusFunction(pristine,valid,event,type){
    if(event == 'focus'){
     this[type] = "focusGreen";
   }
   else if (!pristine && !valid) {
     this[type] = "focusRed";
   }
   if(pristine && (event == 'outfocus')){
     this[type] = "";
   }
  }
  getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

showPosition(position) {
alert("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude);
}
}
