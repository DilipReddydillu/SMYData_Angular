import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
//import {ToasterModule, ToasterService} from 'angular5-toaster';
import {ToastModule} from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule,MatPaginatorModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {MatInputModule} from '@angular/material';


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DataService } from './data.service';
import { BillingService } from './billing.service';
import {IndividualService} from './individual.service';
import { OtpAuthenticationComponent } from './otp-authentication/otp-authentication.component';
import { RewardsComponent } from './rewards/rewards.component';
import { DiscountsComponent } from './discounts/discounts.component';
 import { InvoiceComponent } from './invoice/invoice.component';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SelectInvoiceComponent } from './select-invoice/select-invoice.component';
import { PayablesComponent } from './payables/payables.component';
import { ReceivablesComponent } from './receivables/receivables.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { IndividualRegistrationComponent } from './individual-registration/individual-registration.component';
import { SelectLoginTypeComponent } from './select-login-type/select-login-type.component';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';
import { IndividualReceivablesComponent } from './individual-receivables/individual-receivables.component';
import { IndividualPayablesComponent } from './individual-payables/individual-payables.component';
import { IndividualReportsComponent } from './individual-reports/individual-reports.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { AuthGuard } from './auth-guard/auth-guard';



const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'select', component: SelectLoginTypeComponent },
  { path: 'signIn', component: SignInComponent},
  { path: 'signUp', component: SignupComponent },
  { path: 'IndividualReg', component: IndividualRegistrationComponent },
  { path: 'individualDetails', component: IndividualDetailsComponent , canActivate: [AuthGuard],
  children: [
    {path: 'payables', component: IndividualPayablesComponent},
    {path: 'receivables', component: IndividualReceivablesComponent},
    {path: 'reports', component: IndividualReportsComponent},
  ]
},
{path: 'salesReport', component: SalesReportComponent, canActivate: [AuthGuard]},
  { path: 'userData', component: UserDataComponent, canActivate: [AuthGuard],
    children: [
      {path: 'invoice', component: SelectInvoiceComponent, canActivate: [AuthGuard]},
      {path: 'payables', component: PayablesComponent, canActivate: [AuthGuard]},
      {path: 'receivables', component: ReceivablesComponent, canActivate: [AuthGuard]},
      {path: 'salesReport', component: SalesReportComponent, canActivate: [AuthGuard]},
      {path: 'raiseTicket', component: RaiseTicketComponent, canActivate: [AuthGuard]},
      {path: 'discounts', component: DiscountsComponent, canActivate: [AuthGuard]},
      {path: 'invoiceTemplate', component: InvoiceComponent, canActivate: [AuthGuard]},
      {path: 'businessPlan', component: RewardsComponent, canActivate: [AuthGuard]},
      {path: 'myInfo', component: SignupComponent, canActivate: [AuthGuard]},
      {path: 'addNew', component: SignupComponent, canActivate: [AuthGuard]},
    ]},
  { path: 'otpVerification', component: OtpAuthenticationComponent },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignInComponent,
    UserDataComponent,
    OtpAuthenticationComponent,
    RewardsComponent,
    DiscountsComponent,
    InvoiceComponent,
    SelectInvoiceComponent,
    PayablesComponent,
    ReceivablesComponent,
    RaiseTicketComponent,
    SalesReportComponent,
    IndividualRegistrationComponent,
    SelectLoginTypeComponent,
    IndividualDetailsComponent,
    IndividualReceivablesComponent,
    IndividualPayablesComponent,
    IndividualReportsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatInputModule,
    //ToasterModule,
    ToastModule.forRoot(),
    // MatButtonModule, MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CookieService, DataService, BillingService,IndividualService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
