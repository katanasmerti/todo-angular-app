import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Todo } from '../shared/interfaces/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {

  /** Subscription for observables to unsubscribe after component destroy. */
  private readonly subscription = new Subscription();

  /** List of todos. */
  todos: Todo[] = [];

  constructor(private appService: AppService, private router: Router) {
    console.debug('TodosComponent initiated.');
  }

  public ngOnInit(): void {
    this.subscription.add(this.appService.todos$.subscribe({
      next: (value: Todo[]): void => {
        this.todos = value;
      },
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleTodo(todo: Todo): void {
    todo.done = !todo.done;
    this.appService.todos$.next(this.todos);
  }

  public clean(): void {
    this.appService.todos$.next(this.todos.filter((todo: Todo): boolean => !todo.done));
  }

  public onEditTask($event: MouseEvent, taskData: Todo): void {
    $event.stopPropagation();
    this.appService.taskForEditing$.next(taskData);
    this.router.navigate(['/new']);
  }
}
