import { Component } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.css']
})
export class UploadcsvComponent {
  uploadResult: string = '';
  submissions: any[] = [];
  selectedFile: File | null = null;

  constructor(private effortService: EffortSubmissionService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.selectedFile = file;
      this.uploadResult = '';
    } else {
      this.uploadResult = 'Please select a valid CSV file.';
      this.selectedFile = null;
    }
  }

  submitCsv(): void {
    if (!this.selectedFile) {
      this.uploadResult = 'No valid CSV file selected.';
      return;
    }

    this.effortService.uploadCsv(this.selectedFile).subscribe({
      next: (result) => {
        this.uploadResult = `Upload successful. Inserted: ${result.Inserted.join(', ')}. Updated: ${result.Updated.join(', ')}`;
        this.loadSubmissions();
      },
      error: () => {
        this.uploadResult = 'Upload failed.';
      }
    });
  }

  loadSubmissions(): void {
    this.effortService.getAllEfforts().subscribe({
      next: (data) => {
        this.submissions = data;
      },
      error: () => {
        this.uploadResult = 'Failed to load submissions.';
      }
    });
  }
}
