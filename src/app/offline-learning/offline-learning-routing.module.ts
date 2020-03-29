import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineLearningComponent } from './offline-learning.component';
import { RegisterSkilledCoursesComponent } from './register-skilled-courses/register-skilled-courses.component';
import { SkillCoursesResultsComponent } from './skill-courses-results/skill-courses-results.component';
import { SkillCoursesPaymentComponent } from './skill-courses-payment/skill-courses-payment.component';


const routes: Routes = [
  {
    path: '',
    component: OfflineLearningComponent,
    children: [
      { path: 'register-skilled-courses',component:RegisterSkilledCoursesComponent},
      { path: 'skill-courses-results',component:SkillCoursesResultsComponent},
      { path: 'skill-courses-payment' ,component:SkillCoursesPaymentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineLearningRoutingModule { }
