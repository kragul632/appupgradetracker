import { Component, OnInit } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';

@Component({
  selector: 'app-effort-table',
  templateUrl: './effort-table.component.html',
  styleUrls: ['./effort-table.component.css']
})
export class EffortTableComponent implements OnInit {
  submissions: any[] = [];
  allMondays: string[] = [];
  uploadResult: string = '';

  constructor(private effortService: EffortSubmissionService) {}

  ngOnInit(): void {
    this.loadEfforts();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file || !file.name.endsWith('.csv')) {
      this.uploadResult = 'Please select a valid CSV file.';
      return;
    }

    this.effortService.uploadCsv(file).subscribe({
      next: (result) => {
        this.uploadResult = `Upload successful. Inserted: ${result.Inserted.join(', ')}. Updated: ${result.Updated.join(', ')}`;
        this.loadEfforts();
      },
      error: () => {
        this.uploadResult = 'Upload failed.';
      }
    });
  }

  loadEfforts(): void {
    this.effortService.getAllEfforts().subscribe(data => {
      this.submissions = data;
      const mondaySet = new Set<string>();

      data.forEach(sub => {
        const start = new Date(sub.startDate);
        const end = new Date(sub.endDate);
        const firstMonday = new Date(start);
        firstMonday.setDate(firstMonday.getDate() - ((firstMonday.getDay() + 6) % 7));

        let current = new Date(firstMonday);
        while (current <= end) {
          mondaySet.add(current.toISOString().split('T')[0]);
          current.setDate(current.getDate() + 7);
        }
      });

      this.allMondays = Array.from(mondaySet).sort();
    });
  }

  getEffort(sub: any, date: string): number | string {
    const effort = sub.weeklyEfforts.find((we: any) =>
      new Date(we.weekStartDate).toISOString().split('T')[0] === date
    );
    return effort ? effort.effortHours : '-';
  }
}
