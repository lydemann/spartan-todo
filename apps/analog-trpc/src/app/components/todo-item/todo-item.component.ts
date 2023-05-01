import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { todo } from '@prisma/client';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  template: `
    <div>
      <mat-checkbox [checked]="item?.completed" id="completed">
        {{ item.name }}</mat-checkbox
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
  @Input() item!: todo;
}
