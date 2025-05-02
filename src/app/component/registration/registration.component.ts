import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  isloading = false;
  formData = { fullName: '', phoneNumber: '', address: '', gender :'', branch:'', fellowshipName:'', position:'',churchAddress:'',camping:'' };

  // url = "https://docs.google.com/forms/d/e/1FAIpQLSdell5auLDTP1XN8X5JEBl7xSiWsSTjqXG770QEVp10kaDX8w/formResponse"
  url="https://docs.google.com/forms/u/0/d/e/1FAIpQLScmK2XtIn8PVXnnr0GtCzjajiL62m8ZyPNZovwLng_HqRrniA/formResponse"
 
  stepperOrientation: Observable<StepperOrientation>;
 public personalForm : FormGroup = new FormGroup({});
 public churchForm : FormGroup = new FormGroup({});
 public parentForm : FormGroup = new FormGroup({});
constructor(private http: HttpClient, private fb:FormBuilder) {
  const breakpointObserver = inject(BreakpointObserver);

  this.stepperOrientation = breakpointObserver
    .observe('(min-width: 600px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

 this.personalForm = this.fb.group({
  firstName:[null, [Validators.required]],
  lastName:[null, [Validators.required]],
  gender:["", [Validators.required]],
  address:[null, [Validators.required]],
  emailAddress:[null, [Validators.email]],
  phoneNumber:[null, [Validators.required]],
  workerOrStudent:["", [Validators.required]],
  camping:["", [Validators.required]],
  member:["",[Validators.required]],
  campus:[""],
  alternatePhoneumber:[""],
  campusChapter:[""],
 })
 this.churchForm = this.fb.group({
  churchAddress:[null, [Validators.required]],
  fellowshipName:[null, [Validators.required]],
  branch:[null, [Validators.required]],
  district:[null, [Validators.required]],
  province:["", [Validators.required]],
  parish:[null, [Validators.required]],
  position:[null, [Validators.required]],
  cyfiExco:["", [Validators.required]],
  provExco:["", [Validators.required]],
  ekampoExco:["", [Validators.required]],
  branchExco:["", [Validators.required]],
  
 })
 this.parentForm = this.fb.group({
  name:[null, [Validators.required]],
  address:[null, [Validators.required]],
  phoneNumber:[null, [Validators.required]]
 })

}

onSubmit(){
  this.isloading = true;
  const firstname = this.personalForm.controls['firstName'].value;
  const lastname = this.personalForm.controls['lastName'].value;
  const fullName = `${firstname} ${lastname}`
  const formParams = new HttpParams().set('entry.1744505793',fullName)
            .set('entry.500334091', this.personalForm.controls['phoneNumber'].value)
            .set('entry.214028391',this.personalForm.controls['address'].value)
            .set('entry.1093710786',this.personalForm.controls['gender'].value)
           .set('entry.1872856303',this.personalForm.controls['emailAddress'].value)
           .set('entry.2123079095',this.personalForm.controls['member'].value)
           .set('entry.1404956155',this.personalForm.controls['workerOrStudent'].value)
           .set('entry.1996413254', this.personalForm.controls['camping'].value)
         .set('entry.2139422772',this.personalForm.controls['campus'].value)
         .set('entry.345614685',this.personalForm.controls['campusChapter'].value)
            .set('entry.635639441',this.personalForm.controls['alternatePhoneumber'].value)
           .set('entry.2111701091',this.churchForm.controls['branch'].value)
           .set('entry.644532487',this.churchForm.controls['fellowshipName'].value)
           .set('entry.239238515',this.churchForm.controls['position'].value)
           .set('entry.816168756',this.churchForm.controls['churchAddress'].value)
           .set('entry.1858067319',this.churchForm.controls['district'].value)
           .set('entry.1053862537',this.churchForm.controls['province'].value)
           .set('entry.1243182199',this.churchForm.controls['parish'].value)
           .set('entry.604717175',this.churchForm.controls['cyfiExco'].value)
           .set('entry.1286679025',this.churchForm.controls['provExco'].value)
           .set('entry.1699133960',this.churchForm.controls['ekampoExco'].value)
           .set('entry.2072925540',this.churchForm.controls['branchExco'].value)
           .set('entry.2133178291',this.parentForm.controls['name'].value)
           .set('entry.770434093',this.parentForm.controls['address'].value)
           .set('entry.1520110905',this.parentForm.controls['phoneNumber'].value)

            this.http.post(this.url, formParams, { responseType: 'text' }).subscribe({
              next: () =>{
                this.isloading = false;
                alert('Registration Successful!')
              },
              error: (error) => {
                this.isloading = false;
                alert('Registration Successful!')
              }
            });
            this.personalForm.reset();
            this.churchForm.reset();

}

}
