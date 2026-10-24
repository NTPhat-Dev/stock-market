import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, delay, map, of, throwError } from 'rxjs';
import { Stock, sampleStocks } from '../model/stock';

// Bài 6: nguồn dữ liệu dùng chung trong bộ nhớ, độc lập với API của bài 7.
@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly state = new BehaviorSubject<Stock[]>(sampleStocks());
  readonly stocks$ = this.state.asObservable();

  getStocks(query = ''): Observable<Stock[]> {
    const term = query.trim().toLowerCase();
    return this.stocks$.pipe(
      map((stocks) =>
        stocks.filter((s) => `${s.name} ${s.code} ${s.exchange}`.toLowerCase().includes(term)),
      ),
    );
  }

  getStock(id: number): Observable<Stock> {
    return defer(() => {
      const stock = this.state.value.find((s) => s.id === id);
      return stock ? of({ ...stock }) : throwError(() => new Error('Không tìm thấy cổ phiếu.'));
    }).pipe(delay(100));
  }

  createStock(stock: Stock): Observable<Stock> {
    return defer(() => {
      const code = stock.code.trim().toUpperCase();
      if (this.state.value.some((s) => s.code.toUpperCase() === code)) {
        return throwError(() => new Error('Mã cổ phiếu đã tồn tại.'));
      }
      const created = {
        ...stock,
        name: stock.name.trim(),
        code,
        id: Math.max(0, ...this.state.value.map((s) => s.id ?? 0)) + 1,
      };
      this.state.next([...this.state.value, created]);
      return of(created);
    }).pipe(delay(100));
  }

  updateStock(stock: Stock): Observable<Stock> {
    return defer(() => {
      if (!this.state.value.some((s) => s.id === stock.id)) {
        return throwError(() => new Error('Không tìm thấy cổ phiếu.'));
      }
      const code = stock.code.trim().toUpperCase();
      if (this.state.value.some((s) => s.id !== stock.id && s.code === code)) {
        return throwError(() => new Error('Mã cổ phiếu đã tồn tại.'));
      }
      const updated = { ...stock, name: stock.name.trim(), code };
      this.state.next(this.state.value.map((s) => (s.id === stock.id ? updated : s)));
      return of(updated);
    }).pipe(delay(100));
  }

  deleteStock(id: number): Observable<void> {
    return defer(() => {
      if (!this.state.value.some((s) => s.id === id)) {
        return throwError(() => new Error('Không tìm thấy cổ phiếu.'));
      }
      this.state.next(this.state.value.filter((s) => s.id !== id));
      return of(undefined);
    }).pipe(delay(100));
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.updateStock({ ...stock, favorite: !stock.favorite });
  }
}
