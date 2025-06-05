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
  newComment: string = '';
  originalComments: string = '';

  constructor(private router: Router, private viewdataService: ViewdataService) {
    const nav = this.router.getCurrentNavigation();
    this.item = nav?.extras?.state?.['data'];
    this.originalComments = this.item?.comments || '';
  }

  saveChanges(): void {
    if (this.item && this.item.apmId) {
      this.item.apmId = this.item.apmId.trim();

      if (this.newComment.trim()) {
        const newEntry = this.newComment.trim();

        // ✅ Add new comment on top of original comments with a newline
        this.item.comments = this.originalComments
        ? `${newEntry}\n${this.originalComments}`
        : newEntry;
      
      // ✅ Update the originalComments after saving
      this.originalComments = this.item.comments;
      
      }

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
