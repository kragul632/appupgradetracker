import { Component } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';

@Component({
  selector: 'app-view-application-effort',
  templateUrl: './view-application-effort.component.html',
  styleUrls: ['./view-application-effort.component.css']
})
export class ViewApplicationEffortComponent {
  applicationId: string = '';
  applications: { applicationId: string, appName: string }[] = [];
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
        const date = new Date(we.weekStartDate);
        const formattedDate = this.formatDate(date);
        dateSet.add(formattedDate);
      });
    });
    this.uniqueDates = Array.from(dateSet).sort((a, b) => {
      const parse = (d: string) => new Date(d.split('-').reverse().join('-'));
      return parse(a).getTime() - parse(b).getTime();
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getEffortForDate(effort: any, formattedDate: string): number {
    const match = effort.weeklyEfforts.find((we: any) => {
      const date = new Date(we.weekStartDate);
      const formatted = this.formatDate(date);
      return formatted === formattedDate;
    });
    return match ? match.effortHours : 0;
  }
}
