import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoItem } from './todo-item';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  template: `
    <div>
      <mat-checkbox [checked]="item?.completed" id="completed">
        {{ item.title }}</mat-checkbox
      >
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() item!: TodoItem;
}
