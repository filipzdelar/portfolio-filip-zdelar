import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioData } from './portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly http = inject(HttpClient);

  getPortfolio(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('assets/data/portfolio.json');
  }
}
