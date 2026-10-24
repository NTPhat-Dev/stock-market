import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Stock } from '../../model/stock';
import { StockService } from '../../core/stock.service';
import { HttpService } from '../../core/http.service';
import { errorMessage } from '../../core/errors';
import { StockItem } from '../stock-item/stock-item';
import {
  StockEditDialog,
  StockDetailsDialog,
  StockDeleteDialog,
} from '../stock-dialogs/stock-dialogs';
import { CreateStock } from '../../create-stock/create-stock';

interface ListState {
  stocks: Stock[];
  loading: boolean;
  error: string;
}

@Component({
  selector: 'app-stock-list',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StockItem,
    CreateStock,
  ],
  templateUrl: './stock-list.html',
})
export class StockListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly memory = inject(StockService);
  private readonly api = inject(HttpService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  readonly local = this.route.snapshot.data['local'] === true;
  private readonly source = this.local ? this.memory : this.api;
  private readonly refresh = new BehaviorSubject<void>(undefined);
  readonly search = new FormControl('', { nonNullable: true });
  readonly busy = signal(false);
  readonly operationError = signal('');
  readonly state$: Observable<ListState> = combineLatest([
    this.search.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged()),
    this.refresh,
  ]).pipe(
    switchMap(([query]) =>
      this.source.getStocks(query).pipe(
        map((stocks) => ({ stocks, loading: false, error: '' })),
        startWith({ stocks: [], loading: true, error: '' }),
        catchError((error) => of({ stocks: [], loading: false, error: errorMessage(error) })),
      ),
    ),
  );
  reload(): void {
    this.refresh.next();
  }
  favorite(stock: Stock): void {
    this.mutate(this.source.toggleFavorite(stock), 'Đã cập nhật yêu thích.');
  }
  create(stock: Stock): void {
    this.mutate(this.source.createStock(stock), `Đã thêm ${stock.code}.`);
  }
  edit(stock: Stock): void {
    this.dialog
      .open(StockEditDialog, {
        data: { stock, local: this.local },
        width: '620px',
        maxWidth: '95vw',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.reload();
          this.notify('Đã cập nhật cổ phiếu.');
        }
      });
  }
  details(stock: Stock): void {
    this.dialog.open(StockDetailsDialog, { data: stock, width: '520px', maxWidth: '95vw' });
  }
  openPage(stock: Stock): void {
    if (this.local) this.details(stock);
    else this.router.navigate(['/stocks', stock.id]);
  }
  remove(stock: Stock): void {
    this.dialog
      .open(StockDeleteDialog, { data: stock })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) this.mutate(this.source.deleteStock(stock.id!), `Đã xóa ${stock.code}.`);
      });
  }
  private mutate(operation: Observable<unknown>, message: string): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.operationError.set('');
    operation.subscribe({
      next: () => {
        this.busy.set(false);
        this.reload();
        this.notify(message);
      },
      error: (error) => {
        this.busy.set(false);
        this.operationError.set(errorMessage(error));
      },
    });
  }
  private notify(message: string): void {
    this.snack.open(message, 'Đóng', { duration: 3000 });
  }
}
