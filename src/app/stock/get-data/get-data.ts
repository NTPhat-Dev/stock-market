import { Component } from '@angular/core';
import { StockListComponent } from '../stock-list/stock-list';
@Component({
  selector: 'app-get-data',
  imports: [StockListComponent],
  template: '<app-stock-list />',
})
export class GetDataComponent {}
