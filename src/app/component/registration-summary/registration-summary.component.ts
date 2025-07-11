import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrls: ['./registration-summary.component.css']
})
export class RegistrationSummaryComponent implements OnInit {
  ngOnInit(): void {
    this.isloading = false;
    this.loadPaystackScript().then(() => {
      this.PaystackPop = (<any>window).PaystackPop;
    }).catch(err => {
      console.error('Failed to load Paystack script', err);
    });
  }
 FIELD_MAP = {
  fullname: 'entry.1543901786',
  gender: 'entry.1188837531',
  phone: 'entry.1743645871',
  province: 'entry.315471820',
  branchName: 'entry.1528403744',
  camping: 'entry.1209828857',
  medical: 'entry.1064569609',
  paymentReference: 'entry.620683679',
  paymentVerified: 'entry.35036836',
  dateRegistered: 'entry.1403017940',
  registeredBy: 'entry.1764643678',
  paymentDate: 'entry.1140484444',
  amount: 'entry.657051521', // Example field for amount, adjust as needed
  reference: 'entry.342160168',
  receiptUrl: 'entry.540326705' // Example field for receipt URL, adjust as needed
};
  public isloading: boolean = false;
  delegates: Delegate[] = [];
  pricePerDelegate = 2000; 
  PaystackPop: any;
  email: string = '';
  emailForm: FormGroup;
  uploadUrl: string | null = null;
  /**
   *
   */
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

  loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((<any>window).PaystackPop) {
      resolve(); // already loaded
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject('Paystack script failed to load');
    document.body.appendChild(script);
  });
}
  submit(): void {
    if (this.emailForm.valid) {
      this.saveReceipt();
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

   pay(): void {
    // You can redirect to a payment gateway or call a payment API here
    if(this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.isloading = true;
      this.startPaystackPayment(email, this.total);  
    } else {
       this.emailForm.markAllAsTouched();
      return;
    }
    //alert('Proceeding to payment...');
  }

 verifyPayment(reference: string, email: string): void {
  //this.isloading = true;
  this.http.post('/.netlify/functions/verify-payment', { reference })
    .subscribe({
      next: (res: any) => {
        if (res.verified) {
          // save delegate, navigate to success, etc.
          //console.log('Payment verified:', res);
          const verified = res.verified ? 'yes' : 'no';
          this.saveDelegates(reference, email, verified);
        } else {
          this.isloading = false;
          alert('Payment Verification failed');
        }
      },
      error: err => {
        this.isloading = false;
        alert('Error verifying payment');
      }
    });
}

  startPaystackPayment(email:string, amount:number) {
  const handler = this.PaystackPop.setup({
    key: 'pk_test_56634f93aba03454725fe437e1a06adee1159c55',  // your public key
    email: email,
    amount:amount * 100, // in kobo
    ref: '' + Math.floor(Math.random() * 1000000000 + 1),

    callback: (response: any) => {
      console.log('Payment successful:', response.reference);
      // Send reference to backend for verification
      //this.saveDelegates(response.reference, email, 'yes');
      this.verifyPayment(response.reference, email);
    },

    onClose: () => {
      
      this.zone.run(() => {
          this.isloading = false;          
      });
    }

  });
  
  handler.openIframe();
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
   this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLScKq2ocZF1akJsnAudOlviZDqqU5XmQTediUQkjk_UZm0Maqg/formResponse', formDataReceipt)
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
    formData.append(this.FIELD_MAP.camping, delegate.camping);
    formData.append(this.FIELD_MAP.medical, delegate.medical);
    formData.append(this.FIELD_MAP.paymentReference, reference);
    formData.append(this.FIELD_MAP.paymentVerified, paymentVerified);
    formData.append(this.FIELD_MAP.dateRegistered, new Date().toISOString());
    formData.append(this.FIELD_MAP.registeredBy, email);

    this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfoNM3l95MSEu4e2pykY8lqCnWUamc3AdFufnN6rimfjUHWNQ/formResponse', formData)
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
// model for delegate
export interface Delegate {
  fullname: string;
  gender: string;
  phoneNumber: string;
  camping: string;
  medical: string;
  province: string;
  branchName: string;
  paymentReference?: string;
  paymentVerified?: string;
  dateRegistered?: string;
  registeredBy?: string;
}