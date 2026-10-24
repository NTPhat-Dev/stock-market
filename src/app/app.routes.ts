import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'labs', pathMatch: 'full' },
  { path: 'labs', loadComponent: () => import('./labs/labs-home').then((m) => m.LabsHome) },
  {
    path: 'labs/3',
    loadComponent: () => import('./create-stock/create-stock').then((m) => m.CreateStock),
  },
  {
    path: 'labs/4',
    loadComponent: () => import('./labs/reactive-form-lab').then((m) => m.ReactiveFormLab),
  },
  {
    path: 'labs/5',
    loadComponent: () => import('./labs/component-lab').then((m) => m.ComponentLab),
  },
  {
    path: 'labs/6',
    loadComponent: () => import('./stock/stock-list/stock-list').then((m) => m.StockListComponent),
    data: { local: true },
  },
  { path: 'login', loadComponent: () => import('./login/login').then((m) => m.Login) },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'stocks',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./stock/stock-list/stock-list').then((m) => m.StockListComponent),
      },
      { path: 'list', redirectTo: '', pathMatch: 'full' },
      {
        path: 'create',
        loadComponent: () =>
          import('./stock/create-stock-page/create-stock-page').then((m) => m.CreateStockPage),
      },
      {
        path: 'get-data',
        loadComponent: () => import('./stock/get-data/get-data').then((m) => m.GetDataComponent),
      },
      {
        path: 'post-data',
        loadComponent: () => import('./stock/post-data/post-data').then((m) => m.PostDataComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./stock/stock-details/stock-details').then((m) => m.StockDetailsComponent),
      },
    ],
  },
  { path: 'stock', redirectTo: 'stocks', pathMatch: 'full' },
  { path: 'create-stock', redirectTo: 'stocks/create', pathMatch: 'full' },
  { path: 'account/login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'account/register', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', redirectTo: 'labs' },
];
