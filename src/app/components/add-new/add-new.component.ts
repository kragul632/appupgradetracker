import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EffortService } from '../../services/effort.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {
  effort = {
    applicationId: '',
    appName: '',
    startDate: '',
    endDate: ''
  };

  constructor(private effortService: EffortService, private router: Router) {}

  onSubmit(): void {
    this.effortService.submitEffort(this.effort).subscribe({
      next: (response) => {
        console.log('Submission successful:', response);
        this.router.navigate(['/application-effort']);
      },
      error: (err) => {
        console.error('Submission failed:', err);
      }
    });
  }
}
