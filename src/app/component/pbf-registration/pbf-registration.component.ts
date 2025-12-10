import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pbf-registration',
  templateUrl: './pbf-registration.component.html',
  styleUrls: ['./pbf-registration.component.css']
})
export class PbfRegistrationComponent {
 NumberOfdelegate = 1;
  delegateForm: FormGroup;
  branchLabel: string = 'Branch';
 
  formData = { fullName: '', phoneNumber: '', gender :'', branch:'', position:''};
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
          position:["", [Validators.required]],
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
    this.router.navigate(['/summary-pbf-registration'], {
        state: { delegates: this.delegateForm.value.delegates }
    });
  } else {
    this.delegateForm.markAllAsTouched(); // Show validation messages
  }
  }







}
