import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ViewdataService } from '../services/viewdata.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  context: 'home' | 'pnp' | 'effort' | 'viewdata' | 'upload' | 'edit' | 'add' | 'upload-csv' | 'effort-table' = 'home';

  constructor(
    private viewdataService: ViewdataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        if (url.includes('/viewdata')) {
          this.context = 'viewdata';
        } else if (url.includes('/pnp')) {
          this.context = 'pnp';
        } else if (url.includes('/effort-table')) {
          this.context = 'effort';
        } else if (url === '/' || url === '') {
          this.context = 'home';
        } else if (url.includes('/upload')) {
          this.context = 'upload';
        } else if (url.includes('/edit')) {
          this.context = 'edit';
        } else if (url.includes('/add')) {
          this.context = 'add';
        } else if (url.includes('/upload-csv')) {
          this.context = 'upload-csv';
        } else {
          this.context = 'home';
        }
      });
  }

  downloadCSV() {
    this.viewdataService.downloadApplicationUpgrades().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'application_upgrades.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed:', err);
      }
    });
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  goToEffortUpload() {
    this.router.navigate(['/upload-csv']);
  }
  
}
