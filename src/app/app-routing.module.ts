import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { DohComponent } from './component/doh/doh.component';
import { RegistrationSummaryComponent } from './component/registration-summary/registration-summary.component';
import { SuccessPageComponent } from './component/success-page/success-page.component';
import { PbfRegistrationComponent } from './component/pbf-registration/pbf-registration.component';
import { PbfRegistrationSummaryComponent } from './component/pbf-registration-summary/pbf-registration-summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'register', component: RegistrationComponent }, // Route to form page
    {path: 'doh', component: DohComponent},
    {path:'summary', component:RegistrationSummaryComponent},
    { path: 'success', component: SuccessPageComponent },
    {path: 'pbf-registration', component:PbfRegistrationComponent },
    {path: 'summary-pbf-registration', component:PbfRegistrationSummaryComponent}
  
];
const config: ExtraOptions = {
  scrollPositionRestoration: 'enabled'  // or 'top'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
