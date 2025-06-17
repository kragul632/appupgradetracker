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
  originalUpgradeFactoryArrivalDate: string = '';
  originalPlannedPnPDate: string = '';

  constructor(private router: Router, private viewdataService: ViewdataService) {
    const nav = this.router.getCurrentNavigation();
    this.item = nav?.extras?.state?.['data'];
    this.originalComments = this.item?.comments || '';
    this.originalUpgradeFactoryArrivalDate = this.item?.upgradeFactoryArrivalDate;
    this.originalPlannedPnPDate = this.item?.plannedPnPDate;
  }

  saveChanges(): void {
    if (this.item && this.item.apmId) {
      this.item.apmId = this.item.apmId.trim();
  
      // Set originalUpgradeFactoryArrivalDate if changed
      if (
        this.item.upgradeFactoryArrivalDate &&
        this.item.upgradeFactoryArrivalDate !== this.originalUpgradeFactoryArrivalDate
      ) {
        this.item.originalUpgradeFactoryArrivalDate = this.originalUpgradeFactoryArrivalDate;
      }
  
      // Set originalPlannedPnPDate if changed
      if (
        this.item.plannedPnPDate &&
        this.item.plannedPnPDate !== this.originalPlannedPnPDate
      ) {
        this.item.originalPlannedPnPDate = this.originalPlannedPnPDate;
      }
  
      // Add new comment
      if (this.newComment.trim()) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short'
        }).replace(' ', '-');
  
        const formattedComment = `${formattedDate}: ${this.newComment.trim()}`;
        this.item.comments = this.originalComments
          ? `${formattedComment}\n${this.originalComments}`
          : formattedComment;
  
        this.originalComments = this.item.comments;
        this.newComment = '';
      }
  
      this.viewdataService.updateApplicationUpgrade(this.item.apmId, this.item).subscribe({
        next: () => {
          alert('Update successful!');
          this.router.navigate(['/viewdata']);
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
