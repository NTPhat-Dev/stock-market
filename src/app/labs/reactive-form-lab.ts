import { Component } from '@angular/core';
import { StockFormComponent } from '../shared/stock-form/stock-form';

@Component({
  selector: 'app-reactive-form-lab',
  imports: [StockFormComponent],
  template: `<section class="panel narrow">
    <h1>Bài 4 · Reactive Form</h1>
    <p class="muted">Kiểm tra từng trường và xem kết quả khi Submit.</p>
    <app-stock-form [inspect]="true" submitLabel="Submit" />
  </section>`,
})
export class ReactiveFormLab {}
