import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicEffortSubmission } from '../effort-submission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EffortService {
  private baseUrl = 'https://localhost:7098/api/EffortSubmissions';

  constructor(private http: HttpClient) {}

  // Submit new effort
  submitEffort(data: BasicEffortSubmission): Observable<any> {
    return this.http.post(`${this.baseUrl}/basic-submit`, data);
  }

  // Edit existing effort
  editEffort(id: number, data: BasicEffortSubmission): Observable<any> {
    return this.http.put(`${this.baseUrl}/basic-edit/${id}`, data);
  }

  getEffortById(id: number): Observable<BasicEffortSubmission> {
    return this.http.get<BasicEffortSubmission>(`${this.baseUrl}/basic-edit/${id}`);
  }
  
}
