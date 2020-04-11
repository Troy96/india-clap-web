import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceCentreLoanApplyComponent } from './finance-centre-loan-apply/finance-centre-loan-apply.component';
import { FinanceCentreLoanProvidersComponent } from './finance-centre-loan-providers/finance-centre-loan-providers.component';
import { FinanceCenterComponent } from './finance-center.component';
import { PendingApplicationComponent } from './pending-application/pending-application.component';
import { YourLoanApplicationsComponent } from './your-loan-applications/your-loan-applications.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';


const routes: Routes = [
  {
    path: '', component: FinanceCenterComponent,
    children: [
      {path:'micro-loan-apply',component:FinanceCentreLoanApplyComponent},
      {path:'loan-providers',component:FinanceCentreLoanProvidersComponent},
      {path:'pending-applications',component:PendingApplicationComponent},
      {path:'your-loan-applications',component:YourLoanApplicationsComponent},
      {path:'loan-application',component:LoanApplicationComponent}
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceCenterRoutingModule { }
