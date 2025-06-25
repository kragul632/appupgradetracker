import { Component, OnInit } from '@angular/core';
import { EffortSubmissionService } from '../../services/effort-submission.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-application-effort',
  templateUrl: './view-application-effort.component.html',
  styleUrls: ['./view-application-effort.component.css']
})
export class ViewApplicationEffortComponent implements OnInit {
  applicationId: string = '';
  applications: { applicationId: string, appName: string }[] = [];
  efforts: any[] = [];
  uniqueDates: string[] = [];
  errorMessage: string = '';
  filteredResources: { resourceId: string, resourceName: string }[] = [];
  availableRoles: { roleName: string }[] = [];

  constructor(private effortService: EffortSubmissionService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const appId = params.get('applicationId');
      if (appId) {
        this.applicationId = appId;
        this.fetchEfforts();
      }
    });
  
    this.effortService.getAllApplications().subscribe({
      next: (apps) => this.applications = apps,
      error: () => this.errorMessage = 'Failed to load applications.'
    });
  }
  
  

  fetchEfforts(): void {
    if (!this.applicationId.trim()) {
      this.errorMessage = 'Please enter a valid Application ID.';
      return;
    }
    this.errorMessage = '';
    this.effortService.getEffortsByApplicationId(this.applicationId).subscribe({
      next: (data) => {
        this.efforts = data;
        this.extractUniqueDates();
        
// Rebuild weeklyEffortsMap for all efforts using updated uniqueDates
this.efforts.forEach(effort => {
  effort.weeklyEffortsMap = {};
  this.uniqueDates.forEach(date => {
    effort.weeklyEffortsMap[date] = this.getEffortForDate(effort, date);
  });
});

        this.loadResourcesForApplication(this.applicationId);
        this.loadRoles();
        this.efforts.forEach(effort => {
          effort.weeklyEffortsMap = {};
          if (effort.weeklyEfforts) {
            effort.weeklyEfforts.forEach((we: any) => {
              const formattedDate = this.formatDate(new Date(we.weekStartDate));
              effort.weeklyEffortsMap[formattedDate] = we.effortHours;
            });
            
          }
        });
      },
      error: () => {
        this.errorMessage = 'No data found or an error occurred.';
        this.efforts = [];
        this.uniqueDates = [];
      }
    });
  }

  loadResourcesForApplication(appId: string): void {
    this.effortService.getResourcesByApplicationId(appId).subscribe({
      next: (resources) => this.filteredResources = resources,
      error: () => this.errorMessage = 'Failed to load resources.'
    });
  }

  loadRoles(): void {
    this.effortService.getAllRoles().subscribe({
      next: (roles) => this.availableRoles = roles,
      error: () => this.errorMessage = 'Failed to load roles.'
    });
  }

  onResourceChange(effort: any): void {
    if (effort.resourceId) {
      this.effortService.getResourceName(effort.resourceId).subscribe({
        next: (res) => effort.resourceName = res.resourceName,
        error: () => {
          this.errorMessage = 'Failed to fetch resource name.';
          effort.resourceName = '';
        }
      });
    }
  }

  onRoleChange(effort: any): void {
    if (effort.roleName) {
      this.effortService.getRoleRate(effort.roleName).subscribe({
        next: (res) => effort.rate = res.rate,
        error: () => {
          this.errorMessage = 'Failed to fetch role rate.';
          effort.rate = 0;
        }
      });
    }
  }

  extractUniqueDates(): void {
    const dateSet = new Set<string>();
    this.efforts.forEach(effort => {
      effort.weeklyEfforts?.forEach((we: any) => {
        const date = new Date(we.weekStartDate);
        const formattedDate = this.formatDate(date);
        dateSet.add(formattedDate);
      });
    });
    this.uniqueDates = Array.from(dateSet).sort((a, b) => {
      const parse = (d: string) => new Date(d.split('-').reverse().join('-'));
      return parse(a).getTime() - parse(b).getTime();
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getEffortForDate(effort: any, formattedDate: string): number {
    if (effort.weeklyEffortsMap) {
      return effort.weeklyEffortsMap[formattedDate] ?? 0;
    }
    if (effort.weeklyEfforts) {
      const match = effort.weeklyEfforts.find((we: any) =>
        this.formatDate(new Date(we.weekStartDate)) === formattedDate
      );
      return match ? match.hours : 0;
    }
    return 0;
  }

  toggleEdit(effort: any): void {
    if (effort.isEditing) {
      const weeklyEfforts: { [key: string]: number } = {};
      for (const formattedDate of this.uniqueDates) {
        const [day, monthStr, year] = formattedDate.split('-');
        const monthIndex = new Date(`${monthStr} 1, 2000`).getMonth(); // Convert 'jun' to 5
        const isoDate = new Date(Number(year), monthIndex, Number(day)).toISOString().split('T')[0];
        weeklyEfforts[isoDate] = effort.weeklyEffortsMap?.[formattedDate] ?? 0;
      }
      
      
      const payload = {
        applicationId: effort.applicationId,
        appName: effort.appName,
        resourceId: effort.resourceId,
        resourceName: effort.resourceName,
        roleName: effort.roleName,
        startDate: effort.startDate,
        endDate: effort.endDate,
        rate: effort.rate,
        weeklyEfforts: weeklyEfforts
      };
      this.effortService.updateEffort(effort.id, payload).subscribe({
        next: () => {
          effort.isEditing = false;
          this.fetchEfforts();
        },
        error: () => {
          this.errorMessage = 'Failed to update effort.';
        }
      });
    } else {
      effort.isEditing = true;
      effort.weeklyEffortsMap = {};
      for (const date of this.uniqueDates) {
        effort.weeklyEffortsMap[date] = this.getEffortForDate(effort, date);
      }
    }
  }

  addNewEffort(effort: any): void {
    effort.isAdding = true;
    effort.isNew = true;
    effort.hasChanges = false;
    effort.weeklyEffortsMap = {};
    for (const date of this.uniqueDates) {
      effort.weeklyEffortsMap[date] = 0;
    }
  }

  submitNewEffort(effort: any): void {
    const weeklyEfforts: { [key: string]: number } = {};
    for (const formattedDate of this.uniqueDates) {
      const [day, monthStr, year] = formattedDate.split('-');
      const monthIndex = new Date(`${monthStr} 1, 2000`).getMonth(); // Convert 'jun' to 5
      const isoDate = new Date(Number(year), monthIndex, Number(day)).toISOString().split('T')[0];
      weeklyEfforts[isoDate] = effort.weeklyEffortsMap?.[formattedDate] ?? 0;
    }
    
    

    const payload = {
      applicationId: effort.applicationId,
      appName: effort.appName,
      resourceId: effort.resourceId,
      resourceName: effort.resourceName,
      roleName: effort.roleName,
      startDate: effort.startDate,
      endDate: effort.endDate,
      rate: effort.rate,
      weeklyEfforts: weeklyEfforts
    };

    const isExisting = !!effort.id;

    const request = isExisting
      ? this.effortService.updateEffort(effort.id, payload)
      : this.effortService.addEffort(payload);

    request.subscribe({
      next: () => {
        this.fetchEfforts(); // Refresh to show updated values
      },
      error: () => {
        this.errorMessage = 'Failed to save effort.';
      }
    });
  }

  editApplicationDetails(effort: any): void {
    this.router.navigate(['/edit-effort', effort.id]);
  }

  editSelectedApplication(): void {
    if (!this.applicationId) {
      this.errorMessage = 'Please select an application to edit.';
      return;
    }
  
    // Find the first effort for the selected application
    const selectedEffort = this.efforts.find(e => e.applicationId === this.applicationId);
    if (selectedEffort) {
      this.router.navigate(['/edit-effort', selectedEffort.id]);
    } else {
      this.errorMessage = 'No effort data found for the selected application.';
    }
  }
  
  getAppName(appId: string): string {
    const app = this.applications.find(a => a.applicationId === appId);
    return app ? app.appName : '';
  }
  
}
