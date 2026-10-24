import { TestBed } from '@angular/core/testing';
import { StockItem } from './stock-item';
import { sampleStocks } from '../../model/stock';

describe('StockItem', () => {
  it('renders one stock and emits favorite without mutating the input', async () => {
    const fixture = TestBed.createComponent(StockItem);
    const stock = sampleStocks()[0];
    fixture.componentRef.setInput('stock', stock);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.textContent).toContain('Test Stock Company');
    expect(page.textContent).toContain('$85.00');
    const emit = vi.spyOn(fixture.componentInstance.favorite, 'emit');
    (page.querySelector('[aria-label="Yêu thích TSC"]') as HTMLButtonElement).click();
    expect(emit).toHaveBeenCalledWith(stock);
    expect(stock.favorite).toBe(false);
  });
});
