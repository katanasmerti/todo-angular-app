import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoComponent } from './create-todo.component';
import { CreateTodoRoutingModule } from './create-todo-routing.module';



@NgModule({
  declarations: [
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    CreateTodoRoutingModule
  ]
})
export class CreateTodoModule { }
