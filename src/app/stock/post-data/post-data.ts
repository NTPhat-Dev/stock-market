import { Component } from '@angular/core';
import { CreateStockPage } from '../create-stock-page/create-stock-page';
@Component({
  selector: 'app-post-data',
  imports: [CreateStockPage],
  template: '<app-create-stock-page />',
})
export class PostDataComponent {}
