import { Component } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent {
  selectedFile: File | null = null;
  uploading = false;
  uploadSuccess = false;
  uploadError = false;

  constructor(private effortService: EffortSubmissionService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  
  submitCsv(): void {
    if (!this.selectedFile) return;
  
    this.uploading = true;
    this.uploadSuccess = false;
    this.uploadError = false;
  
    this.effortService.uploadCsv(this.selectedFile).subscribe({
      next: (result) => {
        this.uploadSuccess = true;
        this.uploading = false;
  
        const message = `✅ Upload successful. Inserted: ${result.Inserted.join(', ')}. Updated: ${result.Updated.join(', ')}`;
  
        // ✅ Direct navigation
        this.router.navigate(['/effort-table'], { state: { message } });
      },
      error: () => {
        this.uploadError = true;
        this.uploading = false;
      }
    });
  }
  
}
