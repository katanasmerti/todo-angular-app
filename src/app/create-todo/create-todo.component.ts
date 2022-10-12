import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PriorityOptions } from '../shared/consts/priority-options';
import { PriorityOption } from '../shared/interfaces/priority-option';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoPriority } from '../shared/enums/todo-priority';
import { AppService } from '../app.service';
import { Todo } from '../shared/interfaces/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent implements OnInit, OnDestroy {
  /** Form */
  public todoFormGroup: FormGroup;
  /** Options for priority field */
  public priorityOptions: PriorityOption[] = PriorityOptions;
  /** Model for editing */
  public currentTodoModel: Todo | null = null;
  /** Subscription for observables to unsubscribe after component destroy. */
  private subscription$: Subscription = new Subscription();

  public get titleControl(): AbstractControl<FormControl> | null {
    return this.todoFormGroup.get('title');
  }

  public get isTitleInvalid(): boolean {
    return Boolean(this.titleControl?.invalid && this.titleControl?.touched);
  }

  public get isFormInvalid(): boolean {
    return Boolean(this.todoFormGroup.invalid && this.todoFormGroup.touched);
  }

  constructor(protected fb: FormBuilder, private appService: AppService) {
    /** Init task form group */
    this.todoFormGroup = this.fb.group({
      title: ['', Validators.required],
      priority: TodoPriority.LOW,
    });
  }

  public ngOnInit() {
    /** This subscription helps to handle edit mode */
    this.subscription$.add(this.appService.taskForEditing$.subscribe((data: Todo | null) => {
      this.currentTodoModel = data ? { ...data } : null;

      if (data) {
        this.todoFormGroup.patchValue({ ...data });
      }
    }));
  }

  public ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public createTodo(): void {
    if (this.todoFormGroup.valid) {
      /** Bock for editing existing task */
      if (this.currentTodoModel) {
        const newTask: Todo = {
          ...this.currentTodoModel,
          ...this.todoFormGroup.value,
        };

        this.appService.updateTask(newTask);
        this.appService.taskForEditing$.next(null);
        this.resetForm();
        return;
      }
      /** Bock for creating new task */
      const date = Date.now();
      const newTask: Todo = {
        ...this.todoFormGroup.value,
        date,
        done: false,
        id: date,
      };

      this.appService.addTask(newTask);
      this.resetForm();
    } else {
      this.todoFormGroup.markAllAsTouched();
    }
  }

  /** Reset form and set default value for priority */
  public resetForm(): void {
    this.todoFormGroup.reset();
    this.todoFormGroup.patchValue({ priority: TodoPriority.LOW });
  }
}
