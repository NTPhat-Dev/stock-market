import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Stock } from '../../model/stock';
import { StockChangePipe } from '../../shared/stock-change.pipe';
// Bài 5: component con nhận một cổ phiếu và phát sự kiện cho component cha.
@Component({
  selector: 'app-stock-item',
  imports: [CurrencyPipe, MatButtonModule, StockChangePipe],
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {
  @Input({ required: true }) stock!: Stock;
  @Input() busy = false;
  @Output() favorite = new EventEmitter<Stock>();
  @Output() edit = new EventEmitter<Stock>();
  @Output() remove = new EventEmitter<Stock>();
  @Output() details = new EventEmitter<Stock>();
  @Output() openPage = new EventEmitter<Stock>();
}
