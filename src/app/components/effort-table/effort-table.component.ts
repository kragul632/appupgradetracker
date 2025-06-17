import { Component, OnInit } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-effort-table',
  templateUrl: './effort-table.component.html',
  styleUrls: ['./effort-table.component.css']
})
export class EffortTableComponent implements OnInit {
  submissions: any[] = [];
  allMondays: string[] = [];
  uploadMessage: string = '';

  constructor(
    private effortService: EffortSubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.uploadMessage = nav?.extras?.state?.['message'] || '';
    this.loadEfforts();
  }

  loadEfforts(): void {
    this.effortService.getAllEfforts().subscribe({
      next: (data) => {
        console.log('Effort data received:', data);
        

        this.submissions = data;
        this.allMondays = this.extractMondays(data);
        console.log('All Mondays:', this.allMondays);
      },
      error: (err) => {
        console.error('Error loading efforts:', err);
      }
    });
  }

  extractMondays(data: any[]): string[] {
    const mondaySet = new Set<string>();
  
    data.forEach(sub => {
      const start = new Date(sub.startDate);
      const end = new Date(sub.endDate);
  
      // Adjust to the Monday of the start week
      const firstMonday = new Date(start);
      const day = firstMonday.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const offset = (day === 0) ? -6 : (1 - day); // Sunday => -6, Monday => 0, etc.
      firstMonday.setDate(firstMonday.getDate() + offset);
  
      let current = new Date(firstMonday);
      while (current <= end) {
        mondaySet.add(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 7);
      }
    });
  
    return Array.from(mondaySet).sort();
  }
  
  
  

  getEffort(sub: any, date: string): number | string {
    const effort = sub.weeklyEfforts?.find((we: any) => {
      const effortDate = we.weekStartDate?.split('T')[0];
      const match = effortDate === date;
      console.log(`Comparing ${effortDate} with ${date}: ${match}`);
      return match;
    });
    return effort?.effortHours ?? '-';
  }
  
  
  
  

  getStatusClass(status: string): string {
    switch (status) {
      case 'BLOCKED':
        return 'status-blocked';
      case 'In Progress':
        return 'status-in-progress';
      default:
        return '';
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToAddEffort(): void {
    this.router.navigate(['/add-effort']);
  }
}
