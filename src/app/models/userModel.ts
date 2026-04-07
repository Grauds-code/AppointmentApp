import { signal, WritableSignal } from '@angular/core';
import { required, SchemaPathTree, validate } from '@angular/forms/signals';

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

export function validateUserForm(e: SchemaPathTree<UserModel>) {
  required(e.email, { message: 'Email is required' });
  required(e.password, { message: 'Password is required' });
  if (e.repeatPassword) {
    validate(e.repeatPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(e.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  }
}
