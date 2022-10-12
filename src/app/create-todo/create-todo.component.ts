import { ChangeDetectionStrategy, Component } from '@angular/core';
import { priorityOptions } from '../shared/consts/priority-options';
import { PriorityOption } from '../shared/interfaces/priority-option';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoPriority } from '../shared/enums/todo-priority';
import { AppService } from '../app.service';
import { Todo } from '../shared/interfaces/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent {
  public todoFormGroup: FormGroup;
  public priorityOptions: PriorityOption[] = priorityOptions;

  public get titleControl(): AbstractControl<FormControl> | null {
    return this.todoFormGroup.get('title');
  }

  public get isTitleInvalid(): boolean {
    return !!(this.titleControl?.invalid && this.titleControl?.touched);
  }

  constructor(protected fb: FormBuilder, private appService: AppService) {
    this.todoFormGroup = this.fb.group({
      title: ['', Validators.required],
      priority: TodoPriority.LOW,
    });
  }

  public createTodo(): void {
    if (this.todoFormGroup.valid) {
      const newTask: Todo = {
        ...this.todoFormGroup.value,
        done: false,
        date: new Date().getTime(),
      }
      this.appService.addTask(newTask);
      this.resetForm();
    } else {
      this.todoFormGroup.markAllAsTouched();
    }
  }

  public resetForm(): void {
    this.todoFormGroup.reset();
    this.todoFormGroup.patchValue({ priority: TodoPriority.LOW });
  }
}
