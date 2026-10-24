import { firstValueFrom } from 'rxjs';
import { StockService } from './stock.service';
import { Stock } from '../model/stock';

describe('StockService', () => {
  it('shares changes, searches and rejects duplicate codes', async () => {
    const service = new StockService();
    let count = 0;
    const subscription = service.stocks$.subscribe((stocks) => (count = stocks.length));
    const created = await firstValueFrom(
      service.createStock(new Stock('New Stock', 'new', 10, 10, false, 'NASDAQ')),
    );
    expect(count).toBe(4);
    expect((await firstValueFrom(service.getStocks('NEW')))[0].id).toBe(created.id);
    await expect(firstValueFrom(service.createStock(created))).rejects.toThrow('đã tồn tại');
    const updated = await firstValueFrom(service.toggleFavorite(created));
    expect(updated.favorite).toBe(true);
    await firstValueFrom(service.deleteStock(created.id!));
    expect(count).toBe(3);
    await expect(firstValueFrom(service.getStock(created.id!))).rejects.toThrow('Không tìm thấy');
    subscription.unsubscribe();
  });
});
