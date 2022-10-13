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
  /** Flag to check is submit btn clicked */
  public submitBtnClicked: boolean = false;
  /** Subscription for observables to unsubscribe after component destroy. */
  private subscription$: Subscription = new Subscription();

  public get titleControl(): AbstractControl<FormControl> | null {
    return this.todoFormGroup.get('title');
  }

  public get dateControl(): AbstractControl<FormControl> | null {
    return this.todoFormGroup.get('date');
  }

  public get isTitleInvalid(): boolean {
    return Boolean(this.titleControl?.invalid && this.titleControl?.touched);
  }

  public get isDateInvalid(): boolean {
    return Boolean(this.dateControl?.touched && !this.dateControl?.value);
  }

  public get isFormInvalid(): boolean {
    return Boolean(this.todoFormGroup.invalid && this.todoFormGroup.touched);
  }

  constructor(private fb: FormBuilder, private appService: AppService) {
    /** Init task form group */
    this.todoFormGroup = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      priority: TodoPriority.LOW,
    });
  }

  public ngOnInit() {
    /** This subscription helps to handle edit mode */
    this.subscription$.add(this.appService.taskForEditing$.subscribe((data: Todo | null) => {
      this.currentTodoModel = data ? { ...data } : null;

      if (data) {
        const date = new Date(data.date);
        this.todoFormGroup.patchValue({ ...data, date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` });
      }
    }));
  }

  public ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public createTodo(): void {
    this.submitBtnClicked = true;
    if (this.todoFormGroup.valid && !this.isDateInvalid) {
      /** Bock for editing existing task */
      if (this.currentTodoModel) {
        const newTask: Todo = {
          ...this.currentTodoModel,
          ...this.todoFormGroup.value,
        };

        this.appService.updateTask(newTask);
        this.resetForm();
        return;
      }
      /** Bock for creating new task */
      const date = Date.now();
      const newTask: Todo = {
        ...this.todoFormGroup.value,
        date: Date.parse(`${this.dateControl?.value}`),
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
    this.submitBtnClicked = false;
    this.todoFormGroup.reset();
    this.todoFormGroup.patchValue({ priority: TodoPriority.LOW });
  }
}
