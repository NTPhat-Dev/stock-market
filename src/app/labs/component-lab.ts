import { Component, signal } from '@angular/core';
import { CreateStock } from '../create-stock/create-stock';
import { StockItem } from '../stock/stock-item/stock-item';
import { Stock, sampleStocks } from '../model/stock';

// Bài 5: cha giữ danh sách; @Input truyền xuống, @Output đưa sự kiện trở lại.
@Component({
  selector: 'app-component-lab',
  imports: [CreateStock, StockItem],
  template: `<section>
    <h1>Bài 5 · Truyền dữ liệu giữa component</h1>
    <p class="muted">
      StockList chứa dữ liệu mẫu. CreateStock gửi cổ phiếu mới lên danh sách, StockItem hiển thị
      từng dòng.
    </p>
    @if (message()) {
      <p role="status">{{ message() }}</p>
    }
    <div class="panel-flush">
      @for (stock of stocks(); track stock.id) {
        <app-stock-item
          [stock]="stock"
          (favorite)="favorite($event)"
          (remove)="remove($event)"
          (details)="details($event)"
          (openPage)="details($event)"
          (edit)="edit($event)"
        />
      } @empty {
        <p class="empty-state">Danh sách trống.</p>
      }
    </div>
    <div class="section-gap">
      <app-create-stock
        heading="Create Stock · gửi dữ liệu lên StockList"
        (created)="create($event)"
      />
    </div>
  </section>`,
})
export class ComponentLab {
  readonly stocks = signal(sampleStocks());
  readonly message = signal('');
  create(stock: Stock): void {
    if (this.stocks().some((s) => s.code === stock.code)) {
      this.message.set('Mã cổ phiếu đã tồn tại.');
      return;
    }
    const id = Math.max(0, ...this.stocks().map((s) => s.id ?? 0)) + 1;
    this.stocks.update((stocks) => [...stocks, { ...stock, id }]);
    this.message.set(`Đã nhận ${stock.code} từ CreateStockComponent.`);
  }
  favorite(stock: Stock): void {
    this.stocks.update((stocks) =>
      stocks.map((s) => (s.id === stock.id ? { ...s, favorite: !s.favorite } : s)),
    );
  }
  remove(stock: Stock): void {
    this.stocks.update((stocks) => stocks.filter((s) => s.id !== stock.id));
  }
  details(stock: Stock): void {
    this.message.set(`${stock.name} (${stock.code}) · ${stock.exchange} · $${stock.price}`);
  }
  edit(stock: Stock): void {
    this.message.set(
      `Sự kiện sửa ${stock.code} đã truyền lên component cha. Bài 6 bổ sung dialog cập nhật đầy đủ.`,
    );
  }
}
