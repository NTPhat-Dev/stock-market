import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EXCHANGES, Stock } from '../model/stock';
@Component({
  selector: 'app-create-stock',
  imports: [FormsModule, JsonPipe, MatButtonModule],
  templateUrl: './create-stock.html',
  styleUrl: './create-stock.css',
})
export class CreateStock {
  @Input() heading = 'Bài 3 · Template Form';
  @Input() pending = false;
  @Output() created = new EventEmitter<Stock>();
  readonly exchanges = EXCHANGES;
  stock = new Stock('', '', 0, 0, false, 'NASDAQ');
  confirmed = false;
  result: Stock | null = null;
  onSubmit(form: NgForm): void {
    if (form.invalid || this.pending || this.stock.name.trim().length < 3) return;
    const stock = new Stock(
      this.stock.name.trim(),
      this.stock.code.toUpperCase(),
      Number(this.stock.price),
      Number(this.stock.price),
      false,
      this.stock.exchange,
    );
    this.result = stock;
    this.created.emit(stock);
  }
  resetForm(form: NgForm): void {
    this.stock = new Stock('', '', 0, 0, false, 'NASDAQ');
    this.confirmed = false;
    this.result = null;
    form.resetForm({ name: '', code: '', price: 0, exchange: 'NASDAQ', confirmed: false });
  }
}
