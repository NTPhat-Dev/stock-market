import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/user.service';
import { errorMessage } from '../../core/errors';

@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './account-form.html',
})
export class AccountFormComponent {
  readonly register = input(false);
  private readonly users = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly pending = signal(false);
  readonly error = signal('');
  readonly form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_]{3,30}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
  });
  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.pending()) return;
    this.pending.set(true);
    this.error.set('');
    const operation = this.register()
      ? this.users.register(this.form.getRawValue())
      : this.users.login(this.form.getRawValue());
    operation.subscribe({
      next: () => {
        const target = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(
          target?.startsWith('/') && !target.startsWith('//') ? target : '/stocks',
        );
      },
      error: (error) => {
        this.error.set(errorMessage(error));
        this.pending.set(false);
      },
    });
  }
}
