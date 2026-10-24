import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpService } from '../../core/http.service';
import { errorMessage } from '../../core/errors';
import { StockChangePipe } from '../../shared/stock-change.pipe';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-details',
  imports: [AsyncPipe, CurrencyPipe, StockChangePipe, RouterLink, MatButtonModule],
  template: `
    <section class="panel narrow">
      <p class="eyebrow">Thông tin cổ phiếu</p>
      @if (state$ | async; as state) {
        @if (state.stock; as stock) {
          <h1>{{ stock.name }}</h1>
          <p class="muted">{{ stock.code }} · {{ stock.exchange }}</p>
          <dl class="details-grid">
            <dt>Giá hiện tại</dt>
            <dd>{{ stock.price | currency: 'USD' }}</dd>
            <dt>Giá trước</dt>
            <dd>{{ stock.previousPrice | currency: 'USD' }}</dd>
            <dt>Biến động</dt>
            <dd>{{ stock | stockChange }}</dd>
            <dt>Yêu thích</dt>
            <dd>{{ stock.favorite ? 'Có' : 'Không' }}</dd>
          </dl>
        } @else {
          <h1>Không tải được cổ phiếu</h1>
          <p role="alert" class="error">{{ state.error }}</p>
        }
      } @else {
        <p role="status">Đang tải…</p>
      }
      <a matButton="outlined" routerLink="/stocks">Quay lại danh sách</a>
    </section>
  `,
})
export class StockDetailsComponent {
  private readonly api = inject(HttpService);
  readonly state$ = inject(ActivatedRoute).paramMap.pipe(
    switchMap((params) =>
      this.api.getStock(Number(params.get('id'))).pipe(
        map((stock) => ({ stock: stock as Stock | null, error: '' })),
        catchError((error) => of({ stock: null, error: errorMessage(error) })),
      ),
    ),
  );
}
