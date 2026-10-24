import { TestBed } from '@angular/core/testing';
import { StockFormComponent } from './stock-form';

describe('Reactive stock form', () => {
  it('rejects invalid data and emits normalized stock plus FormData after confirmation', () => {
    const fixture = TestBed.createComponent(StockFormComponent);
    const component = fixture.componentInstance;
    expect(component.form.invalid).toBe(true);
    component.form.patchValue({ name: '   ', code: 'a?', price: -1 });
    expect(component.form.invalid).toBe(true);
    const emit = vi.spyOn(component.submitted, 'emit');
    component.submit();
    expect(emit).not.toHaveBeenCalled();
    component.form.setValue({
      name: ' Test Company ',
      code: 'tsc',
      price: 100,
      exchange: 'NASDAQ',
      confirmed: true,
    });
    component.submit();
    expect(emit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Test Company', code: 'TSC', price: 100 }),
    );
    expect(component.formDataValue?.['price']).toBe('100');
    component.reset();
    expect(component.form.pristine).toBe(true);
    expect(component.form.invalid).toBe(true);
  });
});
