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


  formData = { fullName: '', phoneNumber: '', address: '', gender :'', branch:'', fellowshipName:'', position:'',churchAddress:'',camping:'' };

  url = "https://docs.google.com/forms/d/e/1FAIpQLSdell5auLDTP1XN8X5JEBl7xSiWsSTjqXG770QEVp10kaDX8w/formResponse"
 
  stepperOrientation: Observable<StepperOrientation>;
 public personalForm : FormGroup = new FormGroup({});
 public churchForm : FormGroup = new FormGroup({});
constructor(private http: HttpClient, private fb:FormBuilder) {
  const breakpointObserver = inject(BreakpointObserver);

  this.stepperOrientation = breakpointObserver
    .observe('(min-width: 600px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

 this.personalForm = this.fb.group({
  firstName:[null, [Validators.required]],
  lastName:[null, [Validators.required]],
  gender:[null, [Validators.required]],
  address:[null, [Validators.required]],
  phoneNumber:[null, [Validators.required]],
 })
 this.churchForm = this.fb.group({
  churchAddress:[null, [Validators.required]],
  fellowshipName:[null, [Validators.required]],
  branch:[null, [Validators.required]],
  position:[null, [Validators.required]],
  camping:[null, [Validators.required]],
 })

}

onSubmit(){
  const firstname = this.personalForm.controls['firstName'].value;
  const lastname = this.personalForm.controls['lastName'].value;
  const fullName = `${firstname} ${lastname}`
  const formParams = new HttpParams().set('entry.1914421654',fullName)
            .set('entry.824031380', this.personalForm.controls['phoneNumber'].value)
            .set('entry.702609258',this.personalForm.controls['address'].value)
            .set('entry.2007379219',this.personalForm.controls['gender'].value)
            .set('entry.532739705',this.churchForm.controls['branch'].value)
            .set('entry.913358422',this.churchForm.controls['fellowshipName'].value)
            .set('entry.1540432355',this.churchForm.controls['position'].value)
            .set('entry.1288494070',this.churchForm.controls['churchAddress'].value)
            .set('entry.723775624',this.churchForm.controls['camping'].value)

            this.http.post(this.url, formParams, { responseType: 'text' }).subscribe({
              next: () => console.log('Form submitted successfully!'),
              error: (error) => console.error('Error:', error)
            });
            this.personalForm.reset();
            this.churchForm.reset();

}

}
