import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-error-valdiations',
  imports: [],
  templateUrl: './error-valdiations.html',
  styleUrl: './error-valdiations.css',
})
export class ErrorValdiations {
  state = input.required<FieldState<any, string>>();
}
