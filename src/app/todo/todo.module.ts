import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/todo.reducers';
import { TodoPanelComponent } from './todo-panel/todo-panel.component';
import { TodoService } from './todo.service';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';
import { CreateTodoComponent } from './create-todo/create-todo.component';



@NgModule({
  declarations: [TodoPanelComponent, CreateTodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  providers: [TodoService]
})
export class TodoModule { }
