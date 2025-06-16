
import { Component, Input } from '@angular/core';

import { ViewdataService } from '../services/viewdata.service'; // Adjust the path if needed

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() context: 'home' | 'pnp' | 'effort' = 'home';

  constructor(private viewdataService: ViewdataService) {}

  downloadCSV() {
    this.viewdataService.downloadApplicationUpgrades().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'application_upgrades.csv'; // Change to .xlsx if needed
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed:', err);
      }
    });
  }
}
