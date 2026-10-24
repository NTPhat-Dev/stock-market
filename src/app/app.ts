import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './core/user.service';
import { errorMessage } from './core/errors';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly users = inject(UserService);
  private readonly router = inject(Router);
  readonly error = signal('');
  readonly links = [
    { title: 'Tổng quan bài thực hành', path: '/labs', exact: true },
    { title: 'Bài 3 · Template Form', path: '/labs/3', exact: true },
    { title: 'Bài 4 · Reactive Form', path: '/labs/4', exact: true },
    { title: 'Bài 5 · Component', path: '/labs/5', exact: true },
    { title: 'Bài 6 · Service', path: '/labs/6', exact: true },
    { title: 'Danh sách cổ phiếu', path: '/stocks', exact: true },
    { title: 'Tạo cổ phiếu', path: '/stocks/create', exact: true },
    { title: 'Get data · Bài 7', path: '/stocks/get-data', exact: true },
    { title: 'Post data · Bài 7', path: '/stocks/post-data', exact: true },
  ];
  constructor() {
    this.users.restore().subscribe();
  }
  logout(): void {
    this.users.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => this.error.set(errorMessage(error)),
    });
  }
}
