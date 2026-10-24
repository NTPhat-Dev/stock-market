import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockFormComponent } from '../../shared/stock-form/stock-form';
import { HttpService } from '../../core/http.service';
import { Stock } from '../../model/stock';
import { errorMessage } from '../../core/errors';

@Component({
  selector: 'app-create-stock-page',
  imports: [StockFormComponent, RouterLink, MatButtonModule],
  template: `
    <section class="panel narrow">
      <p class="eyebrow">Thêm vào danh sách</p>
      <h1>Tạo cổ phiếu</h1>
      <p class="muted">Nhập thông tin cổ phiếu mới. Giá được tính bằng USD.</p>
      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }
      <app-stock-form [pending]="saving()" (submitted)="save($event)" />
      <a matButton routerLink="/stocks">Quay lại danh sách</a>
    </section>
  `,
})
export class CreateStockPage {
  private readonly api = inject(HttpService);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  readonly saving = signal(false);
  readonly error = signal('');
  save(stock: Stock): void {
    this.saving.set(true);
    this.error.set('');
    this.api.createStock(stock).subscribe({
      next: () => {
        this.snack.open(`Đã tạo cổ phiếu ${stock.code}.`, 'Đóng', { duration: 3000 });
        this.router.navigate(['/stocks']);
      },
      error: (error) => {
        this.error.set(errorMessage(error));
        this.saving.set(false);
      },
    });
  }
}
