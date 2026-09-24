import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PortfolioDataService } from './portfolio-data.service';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioDataService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PortfolioDataService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads portfolio content from the single JSON source', () => {
    const response = { meta: { title: 'Portfolio' } };

    service.getPortfolio().subscribe((portfolio) => {
      expect(portfolio.meta.title).toBe('Portfolio');
    });

    const request = http.expectOne('assets/data/portfolio.json');
    expect(request.request.method).toBe('GET');
    request.flush(response);
  });
});
