import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EventComponent } from './component/event/event.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import { DohComponent } from './component/doh/doh.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EventComponent,
    FooterComponent,
    AboutUsComponent,
    RegistrationComponent,
    DohComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
