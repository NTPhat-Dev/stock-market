import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const users = inject(UserService);
  const router = inject(Router);
  return users
    .restore()
    .pipe(
      map(
        (authenticated) =>
          authenticated ||
          router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }),
      ),
    );
};
