import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoItem } from '../components/todo-item/todo-item';
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
  todoItems: TodoItem[] = [
    {
      id: 0,
      title: 'Learn about Analog',
      completed: false,
    },
  ];
}
