import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface BankAccount {
  accountName: string;
  bankName: string;
  AccountNumber: string;
  province?: string; // Optional field for province
}

@Component({
  selector: 'app-registration-summary',
  templateUrl: './registration-summary.component.html',
  styleUrls: ['./registration-summary.component.css']
})

export class RegistrationSummaryComponent implements OnInit {
baseUrl: string = 'https://api.cacgmcyfi.com/api/delegates';
 accounts: BankAccount[] = [
    { accountName: 'Esther Uhunmwangho', bankName: 'Access Bank', AccountNumber: '1840162826', province: 'Ihinmwinrhin' },
    { accountName: 'Oghogho Blessing', bankName: 'PalmPay', AccountNumber: '9123426432', province:'Omozee' },
    { accountName: 'Precious Oloyede', bankName: 'Opay', AccountNumber: '7046880128', province: 'Uwelu' }
  ];

  ngOnInit(): void {
    this.isloading = false;
    // this.loadPaystackScript().then(() => {
    //   this.PaystackPop = (<any>window).PaystackPop;
    // }).catch(err => {
    //   console.error('Failed to load Paystack script', err);
    // });
  }
//  FIELD_MAP = {
//   fullname: 'entry.1543901786',
//   gender: 'entry.1188837531',
//   phone: 'entry.1743645871',
//   province: 'entry.315471820',
//   branchName: 'entry.1528403744',
//   camping: 'entry.1209828857',
//   medical: 'entry.1064569609',
//   paymentReference: 'entry.620683679',
//   paymentVerified: 'entry.35036836',
//   dateRegistered: 'entry.1403017940',
//   registeredBy: 'entry.1764643678',
//   paymentDate: 'entry.1140484444',
//   amount: 'entry.657051521', // Example field for amount, adjust as needed
//   reference: 'entry.342160168',
//   receiptUrl: 'entry.540326705' // Example field for receipt URL, adjust as needed
// };
  public isloading: boolean = false;
  public isSubmitting: boolean = false;
  delegates: Delegate[] = [];
  formType: string = '';
  pricePerDelegate = 2000; 
  PaystackPop: any;
  email: string = '';
  emailForm: FormGroup;
  uploadUrl: string | null = null;
  accountDetails: BankAccount | null = null;
  imagePreviewUrl: string | null = null;
  /**
   *
   */
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private zone: NgZone) {
    this.emailForm = this.emailform();
     const nav = this.router.getCurrentNavigation();
    this.delegates = nav?.extras?.state?.['delegates'] || [];
    this.formType = nav?.extras?.state?.['type'] || '';
    this.accountDetails = this.accounts.find(account => account.province === this.delegates[0].province) || null;
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

//   loadPaystackScript(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if ((<any>window).PaystackPop) {
//       resolve(); // already loaded
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.onload = () => resolve();
//     script.onerror = () => reject('Paystack script failed to load');
//     document.body.appendChild(script);
//   });
// }
  // submit(): void {
    
  //   if (this.emailForm.valid) {
  //     this.saveDelegates();
  //   } else {
  //     this.emailForm.markAllAsTouched();
  //   }
  // }

  //  pay(): void {
  //   // You can redirect to a payment gateway or call a payment API here
  //   if(this.emailForm.valid) {
  //     const email = this.emailForm.value.email;
  //     this.isloading = true;
  //     this.startPaystackPayment(email, this.total);  
  //   } else {
  //      this.emailForm.markAllAsTouched();
  //     return;
  //   }
  //   //alert('Proceeding to payment...');
  // }

//  verifyPayment(reference: string, email: string): void {
//   //this.isloading = true;
//   this.http.post('/.netlify/functions/verify-payment', { reference })
//     .subscribe({
//       next: (res: any) => {
//         if (res.verified) {
//           // save delegate, navigate to success, etc.
//           //console.log('Payment verified:', res);
//           const verified = res.verified ? 'yes' : 'no';
//           this.saveDelegates(reference, email, verified);
//         } else {
//           this.isloading = false;
//           alert('Payment Verification failed');
//         }
//       },
//       error: err => {
//         this.isloading = false;
//         alert('Error verifying payment');
//       }
//     });
// }

//   startPaystackPayment(email:string, amount:number) {
//   const handler = this.PaystackPop.setup({
//     key: 'pk_test_56634f93aba03454725fe437e1a06adee1159c55',  // your public key
//     email: email,
//     amount:amount * 100, // in kobo
//     ref: '' + Math.floor(Math.random() * 1000000000 + 1),

//     callback: (response: any) => {
//       console.log('Payment successful:', response.reference);
//       // Send reference to backend for verification
//       //this.saveDelegates(response.reference, email, 'yes');
//       this.verifyPayment(response.reference, email);
//     },

//     onClose: () => {
      
//       this.zone.run(() => {
//           this.isloading = false;          
//       });
//     }

//   });
  
//   handler.openIframe();
// }


onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;

    if (file) {
      // 1. Update the reactive form value
      this.emailForm.patchValue({ paymentReceipt: file });
      this.emailForm.get('paymentReceipt')?.updateValueAndValidity();

      // 2. Handle generating the visual image preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result as string; // Set data URL string
        };
        reader.readAsDataURL(file); // Convert file into a Data URL
      } else {
        // If the user selected a PDF, clear or set a PDF placeholder icon instead
        this.imagePreviewUrl = null; 
      }
    }
  }

submitReceipt(event: Event): void {

  event.stopPropagation(); 
  event.preventDefault();

  // Start loading indicator
  this.isloading = true;

  const cloudName = 'dcjgdyu9i';
  const uploadPreset = 'doh-reg-payment';

  const formData = new FormData();
  const file = this.emailForm.get('paymentReceipt')?.value;
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      //console.log('Upload successful', data);
      this.uploadUrl = data.secure_url;
      this.isloading = false; // Turn off loading on success
      this.imagePreviewUrl = null;
      alert('Payment Receipt uploaded successfully! You can now submit your registration.');
    })
    .catch(err => {
      //console.error('Upload failed', err);
      this.isloading = false; // Turn off loading on failure
      alert('Failed to upload Payment Receipt. Please try again.');

      // Reset the form control so the user can try uploading again
      this.emailForm.get('paymentReceipt')?.reset();
    });


 }


  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (!file) return;

  
  // }

  clearSelection(): void {
    this.imagePreviewUrl = null;
    this.emailForm.get('paymentReceipt')?.setValue(null);
  }









  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (!file) return;

  //   const cloudName = 'dcjgdyu9i';
  //   const uploadPreset = 'doh-reg-payment';

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', uploadPreset);

  //   fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('Upload successful', data);
  //       this.uploadUrl = data.secure_url;
  //     })
  //     .catch(err => {
  //       console.error('Upload failed', err);
  //     });
  // }

saveDelegates(){
  if (!this.uploadUrl) {
    alert('Please upload a payment receipt first.');
    return;
  }
  const reference = '' + Math.floor(Math.random() * 1000000000 + 1);
  this.delegates.forEach((delegate,index) => {
    delegate.paymentReference = reference;
    delegate.paymentVerified = 'No';
    delegate.paymentReceipt = this.uploadUrl || '';
    delegate.programType = this.formType;
  })
  //console.log('Delegates to save:', this.delegates);
  this.isSubmitting = true;
  this.http.post(this.baseUrl + '/bulk', this.delegates )
    .subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/success']);
      },
      error: err => {
        this.isSubmitting = false;
        alert('Error saving delegates');
      },
      complete: () => { 
        this.isSubmitting = false;
        this.uploadUrl = null; // Reset the upload URL after submission
      }
      
    });
  // const formDataReceipt = new FormData();
  // formDataReceipt.append(this.FIELD_MAP.receiptUrl, this.uploadUrl);
  // formDataReceipt.append(this.FIELD_MAP.reference, reference);
  // formDataReceipt.append(this.FIELD_MAP.amount, this.total.toString());
  // formDataReceipt.append(this.FIELD_MAP.paymentDate, new Date().toISOString());

  // this.isloading = true;
  //  this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLScKq2ocZF1akJsnAudOlviZDqqU5XmQTediUQkjk_UZm0Maqg/formResponse', formDataReceipt)
  //   .subscribe({
  //   next: () => {
      
  //     // Optionally, you can navigate to a success page or reset the form
  //   },
  //   error: err => {
  //     this.saveDelegates(reference, '', 'No');

  //   }
  //   })

  // Save the delegates with the uploaded receipt URL
  //this.saveDelegates(this.uploadUrl, email, 'yes');
}










// saveDelegates(reference: string, email: string, paymentVerified: string): void {
//   //this.isloading = true;
//   const delegateCount = this.delegates.length; // Adjusted to match the number of delegates
//   this.delegates.forEach((delegate,index) => {
//     const formData = new FormData();
//     formData.append(this.FIELD_MAP.fullname, delegate.fullname);
//     formData.append(this.FIELD_MAP.gender, delegate.gender);
//     formData.append(this.FIELD_MAP.phone, delegate.phoneNumber);
//     formData.append(this.FIELD_MAP.province, delegate.province);
//     formData.append(this.FIELD_MAP.branchName, delegate.branchName);
//     formData.append(this.FIELD_MAP.camping, delegate.camping);
//     formData.append(this.FIELD_MAP.medical, delegate.medical);
//     formData.append(this.FIELD_MAP.paymentReference, reference);
//     formData.append(this.FIELD_MAP.paymentVerified, paymentVerified);
//     formData.append(this.FIELD_MAP.dateRegistered, new Date().toISOString());
//     formData.append(this.FIELD_MAP.registeredBy, email);

//     this.http.post('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfoNM3l95MSEu4e2pykY8lqCnWUamc3AdFufnN6rimfjUHWNQ/formResponse', formData)
//     .subscribe({
//       next: () => {
//         if(index === delegateCount - 1) {
//           this.isloading = false;
//            this.router.navigate(['/success']);
//         }
       
//       },
//       error: err => {
//         if(index === delegateCount - 1) {
//           this.isloading = false;
//            this.router.navigate(['/success']);
//         }
        
//       }
//     });
    
//   })


//   }

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
  programType?: string;
  paymentReceipt: string;
}