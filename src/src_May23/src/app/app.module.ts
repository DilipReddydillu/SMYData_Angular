import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DataService } from './data.service';
import { BillingService } from './billing.service';
import { OtpAuthenticationComponent } from './otp-authentication/otp-authentication.component';
import { RewardsComponent } from './rewards/rewards.component';
import { DiscountsComponent } from './discounts/discounts.component';
 import { InvoiceComponent } from './invoice/invoice.component';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SelectInvoiceComponent } from './select-invoice/select-invoice.component';
import { PayablesComponent } from './payables/payables.component';
import { ReceivablesComponent } from './receivables/receivables.component';




const appRoutes: Routes = [
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'userData', component: UserDataComponent },
  { path: 'otpVerification', component: OtpAuthenticationComponent },
  { path: 'myRewards', component: RewardsComponent },
  { path: '',
    redirectTo: '/signIn',
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
    ReceivablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // MatButtonModule, MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CookieService, DataService, BillingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
