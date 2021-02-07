import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { todoActionTypes } from '../store/todo.actions';
import { getAllTodo } from '../store/todo.selectors';
import { Todo } from '../todo.model';
import * as uuid from 'uuid';

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
    const checkling = {
      check: !todo.check
    };
    const update: Update<Todo> = {
      id: todo.Id,
      changes: {
        ...todo,
        ...checkling
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
      check: false,
      description: '',
      user: ''
    }
  }

  onSubmit(submittedForm: any){
    if(submittedForm.invalid){
      return;
    }
    const todo: Todo = {
      Id: uuid.v4(),
      check: false,
      description: submittedForm.value.newTodo,
      user: ''
    };

    this.store.dispatch(todoActionTypes.createTodo({todo}));

    this.buffer = "";
  }

}
