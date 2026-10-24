import { CurrencyPipe } from '@angular/common';
import { Component, inject, viewChild, afterNextRender, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Stock } from '../../model/stock';
import { StockFormComponent } from '../../shared/stock-form/stock-form';
import { StockChangePipe } from '../../shared/stock-change.pipe';
import { StockService } from '../../core/stock.service';
import { HttpService } from '../../core/http.service';
import { errorMessage } from '../../core/errors';

export interface StockDialogData {
  stock: Stock;
  local: boolean;
}

@Component({
  selector: 'app-stock-edit-dialog',
  imports: [MatDialogModule, MatButtonModule, StockFormComponent],
  template: `
    <h2 mat-dialog-title>Cập nhật {{ data.stock.code }}</h2>
    <mat-dialog-content>
      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }
      <app-stock-form submitLabel="Lưu thay đổi" [pending]="saving()" (submitted)="save($event)" />
    </mat-dialog-content>
    <mat-dialog-actions
      ><button matButton (click)="ref.close()" [disabled]="saving()">
        Hủy
      </button></mat-dialog-actions
    >
  `,
})
export class StockEditDialog {
  readonly data = inject<StockDialogData>(MAT_DIALOG_DATA);
  readonly ref = inject(MatDialogRef<StockEditDialog>);
  private readonly local = inject(StockService);
  private readonly api = inject(HttpService);
  readonly editor = viewChild.required(StockFormComponent);
  readonly saving = signal(false);
  readonly error = signal('');
  constructor() {
    afterNextRender(() => this.editor().setStock(this.data.stock));
  }
  save(stock: Stock): void {
    this.saving.set(true);
    this.error.set('');
    this.ref.disableClose = true;
    const source = this.data.local ? this.local : this.api;
    source.updateStock(stock).subscribe({
      next: (result) => this.ref.close(result),
      error: (error) => {
        this.error.set(errorMessage(error));
        this.saving.set(false);
        this.ref.disableClose = false;
      },
    });
  }
}

@Component({
  selector: 'app-stock-details-dialog',
  imports: [MatDialogModule, MatButtonModule, CurrencyPipe, StockChangePipe],
  template: `
    <h2 mat-dialog-title>{{ stock.name }} ({{ stock.code }})</h2>
    <mat-dialog-content
      ><dl class="details-grid">
        <dt>Sàn giao dịch</dt>
        <dd>{{ stock.exchange }}</dd>
        <dt>Giá hiện tại</dt>
        <dd>{{ stock.price | currency: 'USD' }}</dd>
        <dt>Giá trước</dt>
        <dd>{{ stock.previousPrice | currency: 'USD' }}</dd>
        <dt>Biến động</dt>
        <dd>{{ stock | stockChange }}</dd>
        <dt>Yêu thích</dt>
        <dd>{{ stock.favorite ? 'Có' : 'Không' }}</dd>
      </dl></mat-dialog-content
    >
    <mat-dialog-actions><button matButton mat-dialog-close>Đóng</button></mat-dialog-actions>
  `,
})
export class StockDetailsDialog {
  readonly stock = inject<Stock>(MAT_DIALOG_DATA);
}

@Component({
  selector: 'app-stock-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Xóa cổ phiếu {{ stock.code }}?</h2>
    <mat-dialog-content>{{ stock.name }} sẽ được xóa khỏi danh sách.</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">Hủy</button>
      <button matButton="filled" [mat-dialog-close]="true">Xóa cổ phiếu</button>
    </mat-dialog-actions>
  `,
})
export class StockDeleteDialog {
  readonly stock = inject<Stock>(MAT_DIALOG_DATA);
}
