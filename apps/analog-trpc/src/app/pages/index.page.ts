import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { todo } from '@prisma/client';
import { injectTRPCClient } from '../../trpc-client';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TodoItemComponent,
  ],
  template: `
    <h1 class="mb-12">Welcome to todoapp</h1>
    <div class="mb-8">
      <app-todo-item
        *ngFor="let item of todoItems"
        [item]="item"
        (delete)="onDeleteTodo($event)"
        (edit)="onEdit($event)"
        (isCompletedChange)="onIsCompletedChange($event)"
      ></app-todo-item>
    </div>

    <form [formGroup]="formGroup" (submit)="onSaveTodo()">
      <mat-form-field class="example-form-field" appearance="fill">
        <mat-label>Todo name</mat-label>
        <input matInput type="text" formControlName="name" />
      </mat-form-field>
      <button
        mat-button
        color="primary"
        [disabled]="formGroup.invalid"
        type="submit"
      >
        Save
      </button>
    </form>
  `,
})
export default class HomeComponent {
  todoItems: todo[] = [];
  selectedTodo: todo | null = null;
  formGroup: FormGroup<{
    name: FormControl<string | null>;
  }>;

  tRpcClient = injectTRPCClient();

  constructor() {
    this.tRpcClient.todos.list.query().then((items) => {
      this.todoItems = items;
    });

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSaveTodo() {
    const todoItem = {
      ...this.selectedTodo,
      name: this.formGroup.value.name!,
    } as todo;

    if (todoItem.id) {
      this.tRpcClient.todos.update
        .mutate({ id: todoItem.id, name: todoItem.name! })
        .then((item) => {
          this.todoItems = this.todoItems.map((item) =>
            item.id === todoItem.id ? todoItem : item
          );
        });
    } else {
      this.tRpcClient.todos.create
        .mutate({ name: todoItem.name! })
        .then((item) => {
          this.todoItems.push(item);
        });
    }

    this.selectedTodo = null;
    this.formGroup.reset();
  }

  onIsCompletedChange(todoItem: todo) {
    this.tRpcClient.todos.complete
      .mutate({ id: todoItem.id, isCompleted: todoItem.is_completed! })
      .then((item) => {
        this.todoItems = this.todoItems.map((item) =>
          item.id === todoItem.id ? todoItem : item
        );
      });
  }

  onEdit(todoItem: todo) {
    this.selectedTodo = todoItem;

    this.formGroup.setValue({
      name: this.selectedTodo.name,
    });
  }

  onDeleteTodo(todoItemId: bigint) {
    this.tRpcClient.todos.remove.mutate({ id: todoItemId }).then(() => {
      this.todoItems = this.todoItems.filter((item) => item.id !== todoItemId);
    });
  }
}
