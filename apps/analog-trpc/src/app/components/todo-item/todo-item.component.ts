import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { todo } from '@prisma/client';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="mb-1">
      <div class="flex justify-between align-center items-center gap-4 p-2">
        <div [class.line-through]="item?.is_completed">
          {{ item?.name }}
        </div>
        <div class="flex justify-center align-center items-center">
          <mat-checkbox color="primary" (change)="onIsCompletedChange($event)">
          </mat-checkbox>
          <button mat-icon-button (click)="onDelete()">
            <mat-icon color="warn" fontIcon="delete"> </mat-icon>
          </button>
          <button mat-icon-button (click)="onEdit()">
            <mat-icon color="accent" fontIcon="edit"> </mat-icon>
          </button>
        </div>
      </div>
    </mat-card>
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

  @Output() delete = new EventEmitter<bigint>();
  @Output() edit = new EventEmitter<todo>();
  @Output() isCompletedChange = new EventEmitter<todo>();

  onDelete() {
    this.delete.emit(this.item?.id);
  }

  onEdit() {
    this.edit.emit(this.item);
  }

  onIsCompletedChange(event: any) {
    this.isCompletedChange.emit({
      ...this.item,
      is_completed: event.target.checked,
    });
  }
}
