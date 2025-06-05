import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ApplicationUpgrade {
    apmId: string;
    appName: string;
    digitalUnit: string;
    upgradeFactoryArrivalDate: string;
    plannedPnPDate: string;
    status: string;
    comments: string;
  }
  

@Injectable({
  providedIn: 'root'
})
export class ViewdataService {
  private apiUrl = 'https://localhost:7098/api/ApplicationUpgrades';

  constructor(private http: HttpClient) {}

  getApplicationUpgrades(): Observable<ApplicationUpgrade[]> {
    return this.http.get<ApplicationUpgrade[]>(this.apiUrl);
  }
  

  updateApplicationUpgrade(apmId: string, data: ApplicationUpgrade) {
      const url = `https://localhost:7098/api/ApplicationUpgrades/${apmId}`;
      return this.http.put(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  
deleteApplicationUpgrade(apmId: string) {
    return this.http.delete(`https://localhost:7098/api/ApplicationUpgrades/${apmId}`);
  }
  
    
  
}
