import { Component, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EXCHANGES, Stock } from '../../model/stock';

export function stockNameValidator(control: AbstractControl): ValidationErrors | null {
  return String(control.value ?? '').trim().length >= 3 ? null : { stockName: true };
}

@Component({
  selector: 'app-stock-form',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './stock-form.html',
})
export class StockFormComponent {
  readonly pending = input(false);
  readonly inspect = input(false);
  readonly submitLabel = input('Tạo cổ phiếu');
  readonly submitted = output<Stock>();
  readonly exchanges = EXCHANGES;
  private readonly builder = inject(FormBuilder);
  readonly form = this.builder.nonNullable.group({
    name: ['', [Validators.required, stockNameValidator]],
    code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,10}$/)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    exchange: ['NASDAQ', Validators.required],
    confirmed: [false, Validators.requiredTrue],
  });
  private original: Stock | null = null;
  submittedValue: Stock | null = null;
  formDataValue: Record<string, string> | null = null;

  setStock(stock: Stock): void {
    this.original = stock;
    this.form.reset({
      name: stock.name,
      code: stock.code,
      price: stock.price,
      exchange: stock.exchange,
      confirmed: false,
    });
  }

  reset(): void {
    this.submittedValue = null;
    this.formDataValue = null;
    if (this.original) this.setStock(this.original);
    else this.form.reset({ exchange: 'NASDAQ' });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.pending()) return;
    const value = this.form.getRawValue();
    const stock = new Stock(
      value.name.trim(),
      value.code.toUpperCase(),
      Number(value.price),
      this.original
        ? Number(value.price) === this.original.price
          ? this.original.previousPrice
          : this.original.price
        : Number(value.price),
      this.original?.favorite ?? false,
      value.exchange,
      this.original?.id,
    );
    // FormData là dữ liệu trình duyệt; FormGroup/FormBuilder quản lý form Angular.
    const data = new FormData();
    for (const [key, entry] of Object.entries(value)) data.append(key, String(entry));
    this.formDataValue = Object.fromEntries(
      Array.from(data.entries(), ([key, entry]) => [key, String(entry)]),
    );
    this.submittedValue = stock;
    this.submitted.emit(stock);
  }
}
