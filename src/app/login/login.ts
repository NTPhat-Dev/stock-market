import { Component } from '@angular/core';
import { AccountFormComponent } from '../shared/account-form/account-form';
@Component({
  selector: 'app-login',
  imports: [AccountFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
