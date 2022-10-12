import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoComponent } from './create-todo.component';
import { CreateTodoRoutingModule } from './create-todo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    CreateTodoRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CreateTodoModule { }
