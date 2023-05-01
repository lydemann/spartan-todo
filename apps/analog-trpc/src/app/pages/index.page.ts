import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { todo } from '@prisma/client';
import { injectTRPCClient } from '../../trpc-client';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <h1>Welcome to todoapp</h1>
    <app-todo-item *ngFor="let item of todoItems" [item]="item"></app-todo-item>
  `,
})
export default class HomeComponent {
  todoItems: todo[] = [];

  tRpcClient = injectTRPCClient();

  constructor() {
    this.tRpcClient.todo.list.query().then((items) => {
      this.todoItems = items;
    });
  }
}
