import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  NumberOfdelegate = 1;
  delegateForm: FormGroup;
 
  formData = { fullName: '', phoneNumber: '', address: '', gender :'', branch:'', fellowshipName:'', position:'',churchAddress:'',camping:'' };

  // url = "https://docs.google.com/forms/d/e/1FAIpQLSdell5auLDTP1XN8X5JEBl7xSiWsSTjqXG770QEVp10kaDX8w/formResponse"
  //"https://docs.google.com/forms/u/0/d/e/1FAIpQLScmK2XtIn8PVXnnr0GtCzjajiL62m8ZyPNZovwLng_HqRrniA/formResponse"
  url="https://docs.google.com/forms/u/0/d/e/1FAIpQLScmK2XtIn8PVXnnr0GtCzjajiL62m8ZyPNZovwLng_HqRrniA/formResponse"

constructor(private http: HttpClient, private fb:FormBuilder, private router: Router) {
  this.delegateForm = this.fb.group({
      delegates: this.fb.array([this.createDelegateGroup()])
    });

}

createDelegateGroup(): FormGroup {
    return this.fb.group({
        fullname:[null, [Validators.required]],
          gender:["", [Validators.required]],
          phoneNumber:[null, [Validators.required]],
          camping:["", [Validators.required]],
          medical:["", [Validators.required]],
          province:["", [Validators.required]],
          branchName:["", [Validators.required]],
       });
  }

  get delegates(): FormArray {
    return this.delegateForm.get('delegates') as FormArray;
  }
  // Add a delegate form if under limit
  addDelegate(maxDelegates:number): void {
    this.delegates.clear(); // Clear existing delegates
    for( let i=0; i <=maxDelegates-1; i++){ {
      this.delegates.push(this.createDelegateGroup());
    }
    
  }
}
onNumberOfDelegateChange($event:any){
  const delegate = $event.target.value;
  this.addDelegate(delegate);
}
  // Optional: remove a delegate form
  removeDelegate(index: number): void {
    if (this.delegates.length > 1) {
      this.delegates.removeAt(index);
    }
  }


  onSubmit(){
    if (this.delegateForm.valid) {
    console.log(this.delegateForm.value);
    this.router.navigate(['/summary'], {
        state: { delegates: this.delegateForm.value.delegates }
    });
  } else {
    this.delegateForm.markAllAsTouched(); // Show validation messages
  }
  }









// onSubmit(){
//   this.isloading = true;
//   const firstname = this.personalForm.controls['firstName'].value;
//   const lastname = this.personalForm.controls['lastName'].value;
//   const fullName = `${firstname} ${lastname}`
//   const formParams = new HttpParams().set('entry.1744505793',fullName)
//             .set('entry.500334091', this.personalForm.controls['phoneNumber'].value)
//             .set('entry.214028391',this.personalForm.controls['address'].value)
//             .set('entry.1093710786',this.personalForm.controls['gender'].value)
//            .set('entry.1872856303',this.personalForm.controls['emailAddress'].value)
//            .set('entry.2123079095',this.personalForm.controls['member'].value)
//            .set('entry.1404956155',this.personalForm.controls['workerOrStudent'].value)
//            .set('entry.1996413254', this.personalForm.controls['camping'].value)
//          .set('entry.2139422772',this.personalForm.controls['campus'].value)
//          .set('entry.345614685',this.personalForm.controls['campusChapter'].value)
//             .set('entry.635639441',this.personalForm.controls['alternatePhoneumber'].value)
//            .set('entry.2111701091',this.churchForm.controls['branch'].value)
//            .set('entry.644532487',this.churchForm.controls['fellowshipName'].value)
//            .set('entry.239238515',this.churchForm.controls['position'].value)
//            .set('entry.816168756',this.churchForm.controls['churchAddress'].value)
//            .set('entry.1858067319',this.churchForm.controls['district'].value)
//            .set('entry.1053862537',this.churchForm.controls['province'].value)
//            .set('entry.1243182199',this.churchForm.controls['parish'].value)
//            .set('entry.604717175',this.churchForm.controls['cyfiExco'].value)
//            .set('entry.1286679025',this.churchForm.controls['provExco'].value)
//            .set('entry.1699133960',this.churchForm.controls['ekampoExco'].value)
//            .set('entry.2072925540',this.churchForm.controls['branchExco'].value)
//            .set('entry.2133178291',this.parentForm.controls['name'].value)
//            .set('entry.770434093',this.parentForm.controls['address'].value)
//            .set('entry.1520110905',this.parentForm.controls['phoneNumber'].value)
//            .set('entry.1093710786_sentinel','')
//             .set('entry.2139422772_sentinel','')
//             .set('entry.2072925540_sentinel','')
//             .set('entry.1286679025_sentinel','')
//             .set('entry.604717175_sentinel','')
//             .set('entry.1699133960_sentinel','')
//             .set('entry.2123079095_sentinel','')
//             .set('entry.1404956155_sentinel','')
//             .set('entry.1996413254_sentinel','')
 
 
 
 
 
 

//             this.http.post(this.url, formParams, { responseType: 'text' }).subscribe({
//               next: () =>{
//                 this.isloading = false;
//                 alert('Registration Successful!')
//               },
//               error: (error) => {
//                 this.isloading = false;
//                 alert('Registration Successful!')
//               }
//             });
//             this.personalForm.reset();
//             this.churchForm.reset();

// }

}
