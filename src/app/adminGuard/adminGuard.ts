import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const userData = sessionStorage.getItem('userData');
  if (userData === 'admin@admin.lv') {
    return true;
  }
  return false;
};
