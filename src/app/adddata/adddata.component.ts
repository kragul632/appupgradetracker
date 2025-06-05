import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.css'] // Make sure this file exists
})
export class AdddataComponent {
  formData = {
    apmId: '',
    appName: '',
    digitalUnit: '',
    upgradeFactoryArrivalDate: '',
    plannedPnPDate: '',
    status: '',
    comments: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  submitForm(): void {
    if (this.isFormValid()) {
      this.http.post('https://localhost:7098/api/ApplicationUpgrades', this.formData)
        .subscribe({
          next: () => {
            this.successMessage = 'Data added successfully!';
            this.errorMessage = '';
            this.resetForm();
            setTimeout(() => this.router.navigate(['/viewdata']), 1500);
          },
          error: () => {
            this.errorMessage = 'Failed to add data. Please try again.';
            this.successMessage = '';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
    }
  }

  isFormValid(): boolean {
    const { apmId, appName, digitalUnit, upgradeFactoryArrivalDate, plannedPnPDate, status } = this.formData;
    return !!(apmId && appName && digitalUnit && upgradeFactoryArrivalDate && plannedPnPDate && status);
  }

  resetForm(): void {
    this.formData = {
      apmId: '',
      appName: '',
      digitalUnit: '',
      upgradeFactoryArrivalDate: '',
      plannedPnPDate: '',
      status: '',
      comments: ''
    };
  }
}
