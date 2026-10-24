import { Component } from '@angular/core';
import { AccountFormComponent } from '../shared/account-form/account-form';

@Component({
  selector: 'app-register',
  imports: [AccountFormComponent],
  template: '<app-account-form [register]="true" />',
})
export class RegisterComponent {}
