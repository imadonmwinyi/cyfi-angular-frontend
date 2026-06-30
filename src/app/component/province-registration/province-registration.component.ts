import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-province-registration',
  templateUrl: './province-registration.component.html',
  styleUrls: ['./province-registration.component.css']
})
export class ProvinceRegistrationComponent {

NumberOfdelegate = 1;
  delegateForm: FormGroup;
  branchLabel: string = 'Branch';
 
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
            phoneNumber:[null, [Validators.required, Validators.pattern(/^(\+234|0)[789][01]\d{8}$/)]],
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
          state: { delegates: this.delegateForm.value.delegates, type: 'province' }
      });
    } else {
      this.delegateForm.markAllAsTouched(); // Show validation messages
    }
    }
  
    onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Other Ministry') {
      this.branchLabel = 'Church'
    } else {
      this.branchLabel = 'Branch';
    }
  }



}

