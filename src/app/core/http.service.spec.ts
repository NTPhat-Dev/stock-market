import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { sampleStocks } from '../model/stock';

describe('HttpService', () => {
  it('uses the API for search, create, update, favorite and delete', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const service = TestBed.inject(HttpService);
    const http = TestBed.inject(HttpTestingController);
    const stock = sampleStocks()[0];
    service.getStocks('TSC').subscribe();
    http.expectOne('/api/stocks?q=TSC').flush([stock]);
    service.createStock(stock).subscribe();
    const create = http.expectOne('/api/stocks');
    expect(create.request.method).toBe('POST');
    expect(create.request.body.id).toBeUndefined();
    create.flush(stock);
    service.updateStock(stock).subscribe();
    const update = http.expectOne('/api/stocks/1');
    expect(update.request.method).toBe('PUT');
    update.flush(stock);
    service.toggleFavorite(stock).subscribe();
    const favorite = http.expectOne('/api/stocks/1');
    expect(favorite.request.method).toBe('PATCH');
    favorite.flush({ ...stock, favorite: true });
    service.deleteStock(1).subscribe();
    const remove = http.expectOne('/api/stocks/1');
    expect(remove.request.method).toBe('DELETE');
    remove.flush({});
    http.verify();
  });
});
