import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { APP_CONSTANTS } from '../constants/app.constants';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const roles = route.data['roles'] as readonly string[] | undefined;
  const auth = inject(AuthService);

  if (roles && auth.hasRole(roles)) {
    return true;
  }

  return inject(Router).parseUrl(APP_CONSTANTS.defaultRoute);
};