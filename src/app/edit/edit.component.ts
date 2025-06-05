import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewdataService, ApplicationUpgrade } from '../services/viewdata.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  item: ApplicationUpgrade;

  constructor(private router: Router, private viewdataService: ViewdataService) {
    const nav = this.router.getCurrentNavigation();
    this.item = nav?.extras?.state?.['data'];
  }

  saveChanges(): void {
    if (this.item && this.item.apmId) {
      this.item.apmId = this.item.apmId.trim(); // ✅ Trim the ID
  
      console.log('Sending to backend:', this.item);
  
      this.viewdataService.updateApplicationUpgrade(this.item.apmId, this.item).subscribe({
        next: () => {
          alert('Update successful!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update. Please check the request format.');
        }
      });
    }
  }

  
goToList(): void {
      this.router.navigate(['/applications']); // Update with your actual route
    }
  
  
  
}
