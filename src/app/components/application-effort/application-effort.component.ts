import { Component, OnInit } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-effort',
  templateUrl: './application-effort.component.html',
  styleUrls: ['./application-effort.component.css']
})
export class ApplicationEffortComponent implements OnInit {
  applications: { applicationId: string; appName: string }[] = [];
  selectedAppId: string = '';
  effortData: any[] = [];
  errorMessage: string = '';
  allWeekDates: string[] = [];

  activeRowIndex: number | null = null;
  newRowEntry: any = {
    resourceId: '',
    resourceName: '',
    roleName: '',
    rate: 0,
    startDate: '',
    endDate: '',
    weeklyEfforts: {} as { [date: string]: number }
  };

  constructor(private effortService: EffortSubmissionService, private router: Router) {}

  ngOnInit(): void {
    this.effortService.getAllApplications().subscribe({
      next: (apps) => {
        this.applications = apps;
      },
      error: () => {
        this.errorMessage = 'Failed to load applications';
      }
    });
  }

  onAppSelect(): void {
    if (!this.selectedAppId) return;

    this.effortService.getEffortsByApplicationId(this.selectedAppId).subscribe({
      next: (data) => {
        this.effortData = data;
        this.errorMessage = '';
        this.generateAllWeekDates();
      },
      error: (error) => {
        this.effortData = [];
        this.errorMessage = error.error || 'No data found for selected application';
      }
    });
  }

  generateAllWeekDates(): void {
    const sundaySet = new Set<string>();
  
    this.effortData.forEach(submission => {
      const start = new Date(submission.startDate);
const end = new Date(submission.endDate);

  
      // Adjust to the Sunday of the start week
      const firstSunday = new Date(start);
      const day = firstSunday.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const offset = -day; // Shift backward to previous Sunday
      firstSunday.setDate(firstSunday.getDate() + offset);
  
      let current = new Date(firstSunday);
      while (current <= end) {
        sundaySet.add(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 7);
      }
    });
  
    this.allWeekDates = Array.from(sundaySet).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }
  
  
  

  getEffortHours(submission: any, date: string): number | string {
    const effort = submission.weeklyEfforts.find((we: { weekStartDate: string }) =>
      new Date(we.weekStartDate).toISOString().split('T')[0] === date
    );
    return effort ? effort.effortHours : '-';
  }
  

  setDefaultDates(submission: any): void {
    this.newRowEntry.startDate = submission.startDate;
    this.newRowEntry.endDate = submission.endDate;
    this.newRowEntry.weeklyEfforts = {};
    this.newRowEntry.rate = 0;

    if (this.newRowEntry.roleName) {
      this.effortService.getRoleRate(this.newRowEntry.roleName).subscribe({
        next: (res) => {
          this.newRowEntry.rate = res.rate;
        },
        error: () => {
          console.warn('Rate fetch failed');
        }
      });
    }
  }

  submitRowEntry(submission: any): void {
    const normalizedEfforts: { [key: string]: number } = {};
  
    Object.entries(this.newRowEntry.weeklyEfforts).forEach(([date, hours]) => {
      const originalDate = new Date(date);
      const sunday = new Date(
        originalDate.getFullYear(),
        originalDate.getMonth(),
        originalDate.getDate() - originalDate.getDay()
      );
      const key = sunday.toISOString().split('T')[0];
      normalizedEfforts[key] = Number(hours);
    });
  
    const totalEffort = Object.values(normalizedEfforts).reduce((sum, val) => sum + val, 0);
    const totalCost = totalEffort * this.newRowEntry.rate;
  
    const payload = {
      applicationId: submission.applicationId,
      appName: submission.appName,
      resourceId: this.newRowEntry.resourceId || this.newRowEntry.resourceName.replace(/\s+/g, '').toLowerCase(),
      resourceName: this.newRowEntry.resourceName,
      roleName: this.newRowEntry.roleName,
      startDate: this.newRowEntry.startDate,
      endDate: this.newRowEntry.endDate,
      rate: this.newRowEntry.rate,
      totalEffortHours: totalEffort,
      totalCost: totalCost,
      weeklyEfforts: normalizedEfforts
    };
  
    this.effortService.updateEffort(submission.id, payload).subscribe({
      next: () => {
        this.onAppSelect();
        this.activeRowIndex = null;
        this.newRowEntry = {
          resourceId: '',
          resourceName: '',
          roleName: '',
          rate: 0,
          startDate: '',
          endDate: '',
          weeklyEfforts: {}
        };
      },
      error: (err) => {
        console.error('Failed to update entry:', err);
      }
    });
  }
  
  

  navigateToAddNew(): void {
    this.router.navigate(['/add-new']);
  }
}
