import { Component, computed, signal } from '@angular/core';
import { Delegate } from '../registration-summary/registration-summary.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.css']
})
export class RegistrationAdminComponent {



  isModalOpen = false;
  selectedUser: Registration | null = null;

  // Filter bindings
  searchQuery = signal<string>('');
  selectedProvince = signal<string>('');
  selectedProgramType = signal<string>('');

provinces: string[] = ['Edo', 'Lagos', 'Abuja', 'Rivers'];
  programTypes: string[] = ['Full-Time', 'Part-Time', 'Weekend Intensive', 'Online Certificate'];

  // Master Data Source
  registrations = signal<Registration[]>([
    { fullName: 'John Doe', phone: '+2348012345678', province: 'Edo', branch: 'Benin Main', programType: 'Full-Time', receiptUrl: 'https://placehold.co' },
    { fullName: 'Jane Smith', phone: '+2348098765432', province: 'Lagos', branch: 'Ikeja', programType: 'Online Certificate', receiptUrl: 'https://placehold.co' },
    { fullName: 'Amara Okafor', phone: '+2348122334455', province: 'Abuja', branch: 'Garki', programType: 'Weekend Intensive', receiptUrl: 'https://placehold.co' },
    { fullName: 'David King', phone: '+2347055667788', province: 'Edo', branch: 'Uselu', programType: 'Part-Time', receiptUrl: 'https://placehold.co' }
  ]);

    filteredRegistrations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const province = this.selectedProvince();
    const program = this.selectedProgramType();

    return this.registrations().filter(user => {
      const matchText = !query || 
        user.fullName.toLowerCase().includes(query) || 
        user.phone.includes(query);
      
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








}

interface Registration {
  fullName: string;
  phone: string;
  province: string;
  branch: string;
  programType: string;
  receiptUrl: string;
}
