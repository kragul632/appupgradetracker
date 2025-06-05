import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploading = false;
  uploadSuccess = false;
  uploadError = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.uploadSuccess = false;
    this.uploadError = false;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('https://localhost:7098/api/ApplicationUpgrades/upload', formData)
      .subscribe({
        next: () => {
          this.uploadSuccess = true;
          this.uploading = false;

          // ✅ Force reload of ViewdataComponent
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/viewdata']);
          });
        },
        error: () => {
          this.uploadError = true;
          this.uploading = false;
        }
      });
  }
}
