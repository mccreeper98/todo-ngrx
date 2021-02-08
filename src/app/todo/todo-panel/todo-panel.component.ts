import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { todoActionTypes } from '../store/todo.actions';
import { getAllTodo } from '../store/todo.selectors';
import { Todo } from '../todo.model';
import * as uuid from 'uuid';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.scss']
})
export class TodoPanelComponent implements OnInit {

  todos$: Observable<Todo[]>;
  todoToBeUpdate!: Todo;
  isUpdateActivated: boolean = false;
  buffer: string = "";

  constructor(
    private todoService: TodoService,
    private store: Store<AppState>
  ) {
    this.todos$ = of([]);
  }

  ngOnInit(): void {
    this.todos$ = this.store.select(getAllTodo);
  }

  deleteTodo(todoId: string){
    this.store.dispatch(todoActionTypes.deleteTodo({todoId}));
  }

  check(todo: Todo){
    const checking = {
      finish: todo.finish === 'true' ? 'flase' : 'true'
    };
    const update: Update<Todo> = {
      id: todo.Id,
      changes: {
        ...todo,
        ...checking
      }
    };

    this.store.dispatch(todoActionTypes.updateTodo({update}));
  }

  showUpdateForm(course: Todo) {
    this.todoToBeUpdate = {...course};
    this.isUpdateActivated = true;
  }

  updateTodo(updateForm: any){
    console.log(updateForm.value);

    const update: Update<Todo> = {
      id: this.todoToBeUpdate?.Id,
      changes: {
        ...this.todoToBeUpdate,
        ...updateForm.value
      }
    }

    this.store.dispatch(todoActionTypes.updateTodo({update}));

    this.isUpdateActivated = false;
    this.todoToBeUpdate = {
      Id:'',
      finish: 'false',
      description: '',
      User_fk: ''
    }
  }

}
