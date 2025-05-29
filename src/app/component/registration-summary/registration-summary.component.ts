import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrls: ['./registration-summary.component.css']
})
export class RegistrationSummaryComponent implements OnInit {
  ngOnInit(): void {
    this.loadPaystackScript().then(() => {
      this.PaystackPop = (<any>window).PaystackPop;
    }).catch(err => {
      console.error('Failed to load Paystack script', err);
    });
  }

  delegates: any[] = [];
  pricePerDelegate = 100; 
  PaystackPop: any;
  email: string = '';
  emailForm: FormGroup;
  /**
   *
   */
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.emailForm = this.emailform();
     const nav = this.router.getCurrentNavigation();
    this.delegates = nav?.extras?.state?.['delegates'] || [];
  }

   get total(): number {
    return this.delegates.length * this.pricePerDelegate;
  }

  emailform(){
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
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


   pay(): void {
    // You can redirect to a payment gateway or call a payment API here
    if(this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.startPaystackPayment(email, this.total);  
    } else {
       this.emailForm.markAllAsTouched();
      return;
    }
    //alert('Proceeding to payment...');
  }

 verifyPayment(reference: string) {
  this.http.post('/.netlify/functions/verify-payment', { reference })
    .subscribe({
      next: (res: any) => {
        if (res.verified) {
          console.log('Payment verified:', res);
          // save delegate, navigate to success, etc.
          alert('Payment verified!');
        } else {
          alert('Verification failed');
        }
      },
      error: err => {
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
      this.verifyPayment(response.reference);
    },

    onClose: () => {
      alert('Payment window closed.');
    }
  });

  handler.openIframe();
}
}
