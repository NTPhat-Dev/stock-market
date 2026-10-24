import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-labs-home',
  imports: [RouterLink, MatButtonModule],
  template: `<section>
    <p class="eyebrow">Lập trình ứng dụng Angular</p>
    <h1>Thực hành Stock Market</h1>
    <p class="muted">
      Các bài 3–9 nối tiếp nhau: từ form nhập liệu đến ứng dụng có API, tài khoản và Angular
      Material.
    </p>
    <div class="lab-grid">
      @for (lab of labs; track lab.number) {
        <article class="panel lab-card">
          <span class="lab-number">Bài {{ lab.number }}</span>
          <h2>{{ lab.title }}</h2>
          <p class="muted">{{ lab.description }}</p>
          <a matButton="outlined" [routerLink]="lab.path">Mở bài thực hành</a>
        </article>
      }
    </div>
  </section>`,
})
export class LabsHome {
  readonly labs = [
    {
      number: 3,
      title: 'Template Form',
      description: 'NgForm, ngModel và màu theo valid, dirty, touched.',
      path: '/labs/3',
    },
    {
      number: 4,
      title: 'Reactive Form',
      description: 'FormGroup, FormBuilder, FormData và kiểm tra dữ liệu.',
      path: '/labs/4',
    },
    {
      number: 5,
      title: 'Component',
      description: 'StockList, StockItem, CreateStock cùng @Input và @Output.',
      path: '/labs/5',
    },
    {
      number: 6,
      title: 'Service & Observable',
      description: 'CRUD dùng chung, tìm kiếm và dialog sửa, xem chi tiết.',
      path: '/labs/6',
    },
    {
      number: 7,
      title: 'HttpClient & API',
      description: 'JSON Server lưu dữ liệu. GET, POST, PUT, PATCH và DELETE.',
      path: '/stocks',
    },
    {
      number: 8,
      title: 'Tài khoản & điều hướng',
      description: 'Đăng ký, đăng nhập và trang chi tiết cổ phiếu.',
      path: '/register',
    },
    {
      number: 9,
      title: 'Material & Pipe',
      description: 'Menu ngang, menu dọc, dialog và định dạng giá, biến động.',
      path: '/stocks',
    },
  ];
}
