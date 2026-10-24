import { Pipe, PipeTransform } from '@angular/core';
import { Stock } from '../model/stock';

@Pipe({ name: 'stockChange' })
export class StockChangePipe implements PipeTransform {
  transform(stock: Stock): string {
    if (stock.previousPrice === 0) return 'Chưa có giá tham chiếu';
    const change = ((stock.price - stock.previousPrice) / stock.previousPrice) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  }
}
