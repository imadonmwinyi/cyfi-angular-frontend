import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { DohComponent } from './component/doh/doh.component';
import { RegistrationSummaryComponent } from './component/registration-summary/registration-summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'register', component: RegistrationComponent }, // Route to form page
    {path: 'doh', component: DohComponent},
    {path:'summary', component:RegistrationSummaryComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
