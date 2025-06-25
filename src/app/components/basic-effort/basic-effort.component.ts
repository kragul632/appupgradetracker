import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EffortSubmissionService } from '../../services/effort-submission.service';
import { EffortService } from 'src/app/services/effort.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basic-effort',
  templateUrl: './basic-effort.component.html',
  styleUrls: ['./basic-effort.component.css']
})
export class BasicEffortComponent implements OnInit {
  effortForm!: FormGroup;
  sundays: string[] = [];

  constructor(
    private fb: FormBuilder,
    private effortService: EffortSubmissionService,
    private effortservice: EffortService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.effortForm = this.fb.group({
      id: [null],
      applicationId: ['', Validators.required],
      appName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    // Load query parameters
    this.route.queryParamMap.subscribe(params => {
      const appId = params.get('applicationId');
      const appName = params.get('appName');

      if (appId) {
        this.effortForm.patchValue({ applicationId: appId });
      }

      if (appName) {
        this.effortForm.patchValue({ appName: appName });
        this.effortForm.get('appName')?.disable(); // Optional: disable if pre-filled
      }
    });

    // Auto-fill appName based on applicationId
    this.effortForm.get('applicationId')?.valueChanges.subscribe(appId => {
      if (appId) {
        this.effortService.getApplicationName(appId).subscribe({
          next: (data) => {
            this.effortForm.patchValue({ appName: data.appName });
            this.effortForm.get('appName')?.disable();
          },
          error: () => {
            this.effortForm.get('appName')?.reset();
            this.effortForm.get('appName')?.enable();
          }
        });
      } else {
        this.effortForm.get('appName')?.reset();
        this.effortForm.get('appName')?.enable();
      }
    });

    // Generate Sundays on form change
    this.effortForm.valueChanges.subscribe(() => {
      this.generateSundays();
    });
  }

  generateSundays() {
    const start = new Date(this.effortForm.getRawValue().startDate);
    const end = new Date(this.effortForm.getRawValue().endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      this.sundays = [];
      return;
    }

    const sundays: string[] = [];
    let current = new Date(start);
    current.setDate(current.getDate() + (7 - current.getDay()) % 7);

    while (current <= end) {
      sundays.push(current.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }));
      current.setDate(current.getDate() + 7);
    }

    this.sundays = sundays;
  }

  onSubmit() {
    const formValue = this.effortForm.getRawValue(); // includes disabled fields
  
    this.effortservice.submitEffort(formValue).subscribe(() => {
      alert('Effort submitted successfully!');
      this.router.navigate(['/view-application-effort'], {
        queryParams: { applicationId: formValue.applicationId }
      });
    });
  }

  goBack(): void {
    const appId = this.effortForm.getRawValue().applicationId;
    this.router.navigate(['/view-application-effort'], {
      queryParams: { applicationId: appId }
    });
  }
  
  
}
