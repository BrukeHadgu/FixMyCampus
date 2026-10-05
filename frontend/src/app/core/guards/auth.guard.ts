import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { APP_CONSTANTS } from '../constants/app.constants';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);

  if (auth.isAuthenticated()) {
    return true;
  }

  return inject(Router).createUrlTree([APP_CONSTANTS.loginRoute], {
    queryParams: { returnUrl: state.url }
  });
};