import { HttpInterceptorFn } from '@angular/common/http';

import { APP_CONSTANTS } from '../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(APP_CONSTANTS.authTokenStorageKey);

  if (!token) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};