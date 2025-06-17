import { Component } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';

@Component({
  selector: 'app-view-application-effort',
  templateUrl: './view-application-effort.component.html',
  styleUrls: ['./view-application-effort.component.css']
})
export class ViewApplicationEffortComponent {
  applicationId: string = '';
  applications: {applicationId: string, appName: string}[] = [];
  efforts: any[] = [];
  uniqueDates: string[] = [];
  errorMessage: string = '';

  constructor(private effortService: EffortSubmissionService) {}

  ngOnInit(): void {
    
this.effortService.getAllApplications().subscribe({
      next: (apps) => this.applications = apps,
      error: () => this.errorMessage = 'Failed to load applications.'
    });
  
  }

  fetchEfforts(): void {
    if (!this.applicationId.trim()) {
      this.errorMessage = 'Please enter a valid Application ID.';
      return;
    }

    this.errorMessage = '';
    this.effortService.getEffortsByApplicationId(this.applicationId).subscribe({
      next: (data) => {
        this.efforts = data;
        this.extractUniqueDates();
      },
      error: () => {
        this.errorMessage = 'No data found or an error occurred.';
        this.efforts = [];
        this.uniqueDates = [];
      }
    });
  }

  extractUniqueDates(): void {
    const dateSet = new Set<string>();
    this.efforts.forEach(effort => {
      effort.weeklyEfforts.forEach((we: any) => {
        const dateStr = new Date(we.weekStartDate).toISOString().split('T')[0];
        dateSet.add(dateStr);
      });
    });
    this.uniqueDates = Array.from(dateSet).sort();
  }

  getEffortForDate(effort: any, date: string): number {
    const match = effort.weeklyEfforts.find((we: any) => {
      const weDate = new Date(we.weekStartDate).toISOString().split('T')[0];
      return weDate === date;
    });
    return match ? match.effortHours : 0;
  }
}
