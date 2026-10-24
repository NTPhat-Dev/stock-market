import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';

// Bài 7: mọi thao tác đi qua HttpClient và được JSON Server ghi vào data.json.
@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/stocks';

  getStocks(query = ''): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url, { params: query.trim() ? { q: query.trim() } : {} });
  }

  getStock(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.url}/${id}`);
  }

  createStock(stock: Stock): Observable<Stock> {
    const { id, ...body } = stock;
    return this.http.post<Stock>(this.url, body);
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.url}/${stock.id}`, stock);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>(`${this.url}/${stock.id}`, { favorite: !stock.favorite });
  }
}
