import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/todo.reducers';
import { TodoPanelComponent } from './todo-panel/todo-panel.component';



@NgModule({
  declarations: [TodoPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('todos', todoReducer)
  ]
})
export class TodoModule { }
