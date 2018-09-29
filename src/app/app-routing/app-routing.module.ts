import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { SignupComponent } from '../signup/signup.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { DataService } from '../data.service';
import { BillingService } from '../billing.service';
import {IndividualService} from '../individual.service';
import { OtpAuthenticationComponent } from '../otp-authentication/otp-authentication.component';
import { RewardsComponent } from '../rewards/rewards.component';
import { DiscountsComponent } from '../discounts/discounts.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { SelectInvoiceComponent } from '../select-invoice/select-invoice.component';
import { PayablesComponent } from '../payables/payables.component';
import { ReceivablesComponent } from '../receivables/receivables.component';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';
import { SalesReportComponent } from '../sales-report/sales-report.component';
import { IndividualRegistrationComponent } from '../individual-registration/individual-registration.component';
import { SelectLoginTypeComponent } from '../select-login-type/select-login-type.component';
import { IndividualDetailsComponent } from '../individual-details/individual-details.component';
import { IndividualReceivablesComponent } from '../individual-receivables/individual-receivables.component';
import { IndividualPayablesComponent } from '../individual-payables/individual-payables.component';
import { IndividualReportsComponent } from '../individual-reports/individual-reports.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { RegisterComponent } from '../register/register.component';
import { BusinessUsersComponent } from '../business-users/business-users.component';
import { IndividualUsersComponent } from '../individual-users/individual-users.component';
import { InvoiceGenerationComponent } from '../invoice-generation/invoice-generation.component';
import { AuthGuard } from '../auth-guard/auth-guard';



const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent },
  // { path: 'select', component: SelectLoginTypeComponent },
  {path: 'businessData', component: BusinessUsersComponent},
  {path: 'individualData', component: IndividualUsersComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'signUp', component: RegisterComponent },
  { path: 'IndividualReg', component: IndividualRegistrationComponent },
  { path: 'individualDetails', component: IndividualDetailsComponent ,
  children: [
    {path: 'payables', component: IndividualPayablesComponent},
    {path: 'receivables', component: IndividualReceivablesComponent},
    {path: 'reports', component: IndividualReportsComponent}
  ]
},
{path: 'salesReport', component: SalesReportComponent},
  { path: 'userData', component: UserDataComponent,
    children: [
      {path: 'invoice', component: SelectInvoiceComponent},
      {path: 'payables', component: PayablesComponent},
      {path: 'receivables', component: ReceivablesComponent},
      {path: 'salesReport', component: SalesReportComponent},
      {path: 'raiseTicket', component: RaiseTicketComponent},
      {path: 'discounts', component: DiscountsComponent},
      {path: 'invoiceTemplate', component: InvoiceComponent},
      {path: 'generateInvoice', component: InvoiceGenerationComponent},
      {path: 'businessPlan', component: RewardsComponent},
      {path: 'myInfo', component: SignupComponent},
      {path: 'addNew', component: SignupComponent}
    ]},
  { path: 'otpVerification', component: OtpAuthenticationComponent },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
