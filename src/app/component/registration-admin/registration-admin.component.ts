import { Component, computed, effect, signal } from '@angular/core';
import { Delegate } from '../registration-summary/registration-summary.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.css']
})
export class RegistrationAdminComponent {


  constructor(private http: HttpClient) {
    
  }

  baseUrl: string = 'https://api.cacgmcyfi.com/api/delegates';
  isModalOpen = false;
  selectedUser: Registration | null = null;

  // Filter bindings
  searchQuery = signal<string>('');
  selectedProvince = signal<string>('');
  selectedProgramType = signal<string>('');

provinces: string[] = ['Uwelu', 'Omozee', 'Ihinmwinrhin'];
programTypes: string[] = ['province', 'doh', 'pbf'];

  // Master Data Source
  registrations = signal<Registration[]>([]);

  trackProvinceChange = effect(() => {
    const province = this.selectedProvince();
    if (province) {
      // Angular tracking mechanism detects this read and executes this block 
      // ONLY when the actual value of selectedProvince changes.
      this.loadRegistrations(province);
    }
  });
    filteredRegistrations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const province = this.selectedProvince();
    const program = this.selectedProgramType();
    return this.registrations().filter(user => {
      const matchText = !query || 
        user.fullname.toLowerCase().includes(query) || 
        user.phoneNumber.includes(query);
      
      const matchProvince = !province || user.province === province;
      const matchProgram = !program || user.programType === program;

      return matchText && matchProvince && matchProgram;
    });
  });


 openReceipt(user: Registration): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeReceipt(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedProvince.set('');
    this.selectedProgramType.set('');
  }

  loadRegistrations(province: string): void {
      this.http.get<Registration[]>(this.baseUrl + '?province=' + province).subscribe({
      next: (data) => {
        // Use .set() to completely replace the current signal value
        this.registrations.set(data);
      },
      error: (err) => console.error('Failed to load registrations', err)
    });
  }







}

interface Registration {
  fullname: string;
  gender: string;
  medical:string;
  camping:string;
  phoneNumber: string;
  province: string;
  branchName: string;
  programType: string;
  paymentReceipt: string;
}
