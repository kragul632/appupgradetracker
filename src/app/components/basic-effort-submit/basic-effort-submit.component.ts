import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffortService } from '../../services/effort.service';
import { BasicEffortSubmission } from '../../effort-submission.model';

@Component({
  selector: 'app-basic-effort-submit',
  templateUrl: './basic-effort-submit.component.html',
  styleUrls: ['./basic-effort-submit.component.css']
})
export class BasicEffortSubmitComponent implements OnInit {
  effortId!: number;
  effortData: BasicEffortSubmission = {
    id: 0,
    applicationId: '',
    appName: '',
    startDate: '',
    endDate: ''
  };
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private effortService: EffortService,
    private router: Router
  ) {}

  
ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const appId = params.get('applicationId');
      const appName = params.get('appName');
  
      if (appId) {
        this.effortData.applicationId = appId;
      }
  
      if (appName) {
        this.effortData.appName = appName;
      }
    });
  
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.effortId = Number(idParam);
      this.loadEffortData();
    }
  }
  
  
  

  loadEffortData(): void {
    this.effortService.getEffortById(this.effortId).subscribe({
      next: (data) => {
        this.effortData = {
          id: data.id,
          applicationId: data.applicationId,
          appName: data.appName,
          startDate: data.startDate,
          endDate: data.endDate
        };
      },
      error: () => this.errorMessage = 'Failed to load effort data.'
    });
  }
  
  
  onSubmit(): void {
    this.effortService.editEffort(this.effortId, this.effortData).subscribe({
      next: () => {
        alert('Effort updated successfully!');
        this.errorMessage = '';
        this.router.navigate(['/view-application-effort'], {
          queryParams: { applicationId: this.effortData.applicationId }
        });
      },
      error: () => {
        this.errorMessage = 'Failed to update effort.';
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/view-application-effort'], {
      queryParams: { applicationId: this.effortData.applicationId }
    });
  }
  
}
