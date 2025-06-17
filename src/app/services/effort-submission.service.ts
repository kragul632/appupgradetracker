import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EffortSubmissionService {
  private apiUrl = 'https://localhost:7098/api/EffortSubmissions';

  constructor(private http: HttpClient) {}

  // Submit effort payload
  addEffort(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  // Get all efforts
  getAllEfforts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get efforts by application ID
  getEffortsByApplicationId(applicationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-application/${applicationId}`);
  }

  getAllApplications(): Observable<{ applicationId: string; appName: string }[]> {
    return this.http.get<{ applicationId: string; appName: string }[]>(`${this.apiUrl}/applications`);
  }
  

  // Get application name by ID
  getApplicationName(appId: string): Observable<{ applicationId: string; appName: string }> {
    return this.http.get<{ applicationId: string; appName: string }>(
      `${this.apiUrl}/application/${appId}`
    );
  }

  // Upload CSV
  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload-csv`, formData);
  }

  // Get resource name by ID
  getResourceName(resourceId: string): Observable<{ resourceId: string; resourceName: string }> {
    return this.http.get<{ resourceId: string; resourceName: string }>(
      `${this.apiUrl}/resource/${resourceId}`
    );
  }

  // Get role rate by role name
  getRoleRate(roleName: string): Observable<{ roleName: string; rate: number }> {
    return this.http.get<{ roleName: string; rate: number }>(
      `${this.apiUrl}/role/${roleName}`
    );
  }
}
