import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTodoComponent } from './todo/create-todo/create-todo.component';
import { TodoPanelComponent } from './todo/todo-panel/todo-panel.component';
import { TodoResolver } from './todo/todo.resolver';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoPanelComponent,
    resolve:{
      todos: TodoResolver
    }
  },
  {
    path: 'create',
    component: CreateTodoComponent
  },
  {
    path: '**',
    redirectTo: 'todo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
