import { Component, OnInit } from '@angular/core';
import { ViewdataService, ApplicationUpgrade } from '../services/viewdata.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css']
})
export class ViewdataComponent implements OnInit {
  upgrades: ApplicationUpgrade[] = [];

  constructor(private viewdataService: ViewdataService,private router: Router) {}

  ngOnInit(): void {
    this.viewdataService.getApplicationUpgrades().subscribe(data => {
      this.upgrades = data;
    });
  }

  
editItem(item: ApplicationUpgrade): void {
    this.router.navigate(['/edit'], { state: { data: item } });
  }
  
  deleteItem(item: ApplicationUpgrade): void {
    if (confirm(`Are you sure you want to delete the application upgrade for ${item.appName}?`)) {
      this.viewdataService.deleteApplicationUpgrade(item.apmId).subscribe({
        next: () => {
          this.upgrades = this.upgrades.filter(u => u.apmId !== item.apmId);
          console.log('Deleted successfully');
        },
        error: err => {
          console.error('Error deleting item:', err);
        }
      });
    }
  }
  
  
}
