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
  newComment: string = ''; // ✅ Add this line here

  constructor(private router: Router, private viewdataService: ViewdataService) {
    const nav = this.router.getCurrentNavigation();
    this.item = nav?.extras?.state?.['data'];
  }

  saveChanges(): void {
    if (this.item && this.item.apmId) {
      this.item.apmId = this.item.apmId.trim();
  
      if (this.newComment.trim()) {
        const newEntry = this.newComment.trim();
        const existing = this.item.comments?.trim() || '';
        this.item.comments = existing ? `${newEntry}\n\n${existing}` : newEntry;
      }
      
      console.log('Final comment string:', this.item.comments);

  
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
    this.router.navigate(['/viewdata']);
  }
}
