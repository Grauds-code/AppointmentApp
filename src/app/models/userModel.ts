import { signal, WritableSignal } from '@angular/core';

export interface UserModel {
  id?: number;
  email: string;
  password: string;
  repeatPassword?: string;
}

export function createUserForm(): WritableSignal<UserModel> {
  return signal<UserModel>({
    email: '',
    password: '',
    repeatPassword: '',
  });
}
