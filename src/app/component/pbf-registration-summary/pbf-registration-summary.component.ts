import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pbf-registration-summary',
  templateUrl: './pbf-registration-summary.component.html',
  styleUrls: ['./pbf-registration-summary.component.css']
})
export class PbfRegistrationSummaryComponent {

FIELD_MAP = {
  fullname: 'entry.173706770',
  gender: 'entry.433002363',
  phone: 'entry.548674238',
  province: 'entry.476906176',
  branchName: 'entry.1881037727',
  position: 'entry.234768867',
  paymentReference: 'entry.1245899047',
  // paymentVerified: 'entry.35036836',
  // dateRegistered: 'entry.1403017940',
  // registeredBy: 'entry.1764643678',
  paymentDate: 'entry.1276169738',
  amount: 'entry.1823181256', // Example field for amount, adjust as needed
  reference: 'entry.1044819015',
  receiptUrl: 'entry.1248362369' // Example field for receipt URL, adjust as needed
};
   public isloading: boolean = false;
    delegates: Delegate[] = [];
    pricePerDelegate = 2000; 
    PaystackPop: any;
    email: string = '';
    emailForm: FormGroup;
    uploadUrl: string | null = null;
    
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private zone: NgZone) {
      this.emailForm = this.emailform();
       const nav = this.router.getCurrentNavigation();
      this.delegates = nav?.extras?.state?.['delegates'] || [];
      this.isloading = false;
    }
  
     get total(): number {
      return this.delegates.length * this.pricePerDelegate;
    }
  
    emailform(){
      return this.fb.group({
        paymentReceipt: ['', [Validators.required]]
      });
    }
  submit(): void {
    if (this.emailForm.valid) {
      this.saveReceipt();
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const cloudName = 'dcjgdyu9i';
    const uploadPreset = 'doh-reg-payment';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log('Upload successful', data);
        this.uploadUrl = data.secure_url;
      })
      .catch(err => {
        console.error('Upload failed', err);
      });
  }

saveReceipt(){
  if (!this.uploadUrl) {
    alert('Please upload a payment receipt first.');
    return;
  }
  const reference = '' + Math.floor(Math.random() * 1000000000 + 1);
  const formDataReceipt = new FormData();
  formDataReceipt.append(this.FIELD_MAP.receiptUrl, this.uploadUrl);
  formDataReceipt.append(this.FIELD_MAP.reference, reference);
  formDataReceipt.append(this.FIELD_MAP.amount, this.total.toString());
  formDataReceipt.append(this.FIELD_MAP.paymentDate, new Date().toISOString());

  this.isloading = true;
   this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLScYITp3uFV86nGzQG2QJZ0rkbO8C0IW9RLIJ8K7bBOxIb8zQg/formResponse', formDataReceipt)
    .subscribe({
    next: () => {
      
      // Optionally, you can navigate to a success page or reset the form
    },
    error: err => {
      this.saveDelegates(reference, '', 'No');

    }
    })

  // Save the delegates with the uploaded receipt URL
  //this.saveDelegates(this.uploadUrl, email, 'yes');
}

saveDelegates(reference: string, email: string, paymentVerified: string): void {
  //this.isloading = true;
  const delegateCount = this.delegates.length; // Adjusted to match the number of delegates
  this.delegates.forEach((delegate,index) => {
    const formData = new FormData();
    formData.append(this.FIELD_MAP.fullname, delegate.fullname);
    formData.append(this.FIELD_MAP.gender, delegate.gender);
    formData.append(this.FIELD_MAP.phone, delegate.phoneNumber);
    formData.append(this.FIELD_MAP.province, delegate.province);
    formData.append(this.FIELD_MAP.branchName, delegate.branchName);
    formData.append(this.FIELD_MAP.position, delegate.position);
    formData.append(this.FIELD_MAP.paymentReference, reference);
    // formData.append(this.FIELD_MAP.dateRegistered, new Date().toISOString());

    this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdyCmDdnK7o5yxa84xkEtIqeaJHPu4-cXFsTYzopaFZSwoELQ/formResponse', formData)
    .subscribe({
      next: () => {
        if(index === delegateCount - 1) {
          this.isloading = false;
           this.router.navigate(['/success']);
        }
       
      },
      error: err => {
        if(index === delegateCount - 1) {
          this.isloading = false;
           this.router.navigate(['/success']);
        }
        
      }
    });
    
  })


  }


}

export interface Delegate {
  fullname: string;
  gender: string;
  phoneNumber: string;
  camping: string;
  position: string;
  province: string;
  branchName: string;
  paymentReference?: string;
  paymentVerified?: string;
  dateRegistered?: string;
  registeredBy?: string;
}
