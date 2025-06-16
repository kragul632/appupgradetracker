import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EffortSubmissionService } from '../../services/effort-submission.service';

@Component({
  selector: 'app-add-effort',
  templateUrl: './add-effort.component.html',
  styleUrls: ['./add-effort.component.css']
})
export class AddEffortComponent {
  effortPayload = {
    applicationId: '',
    appName: '',
    resourceId: '',
    resourceName: '',
    roleName: '',
    startDate: '',
    endDate: '',
    rate: 0,
    weeklyEfforts: {} as { [key: string]: number }
  };

  mondays: string[] = [];

  roles: string[] = [
    'IICS Lead', 'Java Lead', 'Tech Developer', 'Architect', 'AIMS Support',
    'PBI Lead', 'PBI Sr. Developer', 'Java Developer', 'Junior Developer', 'PM',
    'Tester', 'Appian Developer', 'Sr. UI Developer', 'PBI Manager', 'Developer',
    'PBI Developer', 'Sr.Tester', 'IICS PM', 'Database', 'IICS Developer', 'AIMS',
    'Test Lead', 'Junior Tester', 'PBI Tester', 'Appian Lead', 'Sr Tester'
  ];

  constructor(
    private effortService: EffortSubmissionService,
    private router: Router
  ) {}

  submitEffort(): void {
    this.effortService.addEffort(this.effortPayload).subscribe({
      next: () => {
        alert('Effort submitted successfully!');
        this.router.navigate(['/effort-table']);
      },
      error: (err) => alert('Error submitting effort: ' + err.message)
    });
  }

  addWeeklyEffort(date: string, hours: number): void {
    this.effortPayload.weeklyEfforts[date] = hours;
  }

  generateMondays(): void {
    this.mondays = [];

    if (!this.effortPayload.startDate || !this.effortPayload.endDate) return;

    const start = new Date(this.effortPayload.startDate);
    const end = new Date(this.effortPayload.endDate);

    const firstMonday = new Date(start);
    firstMonday.setDate(firstMonday.getDate() - ((firstMonday.getDay() + 6) % 7));

    let current = new Date(firstMonday);
    while (current <= end) {
      const isoDate = current.toISOString().split('T')[0];
      this.mondays.push(isoDate);
      current.setDate(current.getDate() + 7);
    }
  }

  onApplicationIdChange(): void {
    if (this.effortPayload.applicationId) {
      this.effortService.getApplicationName(this.effortPayload.applicationId).subscribe({
        next: (data) => this.effortPayload.appName = data.appName,
        error: () => this.effortPayload.appName = ''
      });
    }
  }

  onResourceIdChange(): void {
    if (this.effortPayload.resourceId) {
      this.effortService.getResourceName(this.effortPayload.resourceId).subscribe({
        next: (data) => this.effortPayload.resourceName = data.resourceName,
        error: () => this.effortPayload.resourceName = ''
      });
    }
  }

  onRoleNameChange(): void {
    if (this.effortPayload.roleName) {
      this.effortService.getRoleRate(this.effortPayload.roleName).subscribe({
        next: (data) => this.effortPayload.rate = data.rate,
        error: () => this.effortPayload.rate = 0
      });
    }
  }
}
