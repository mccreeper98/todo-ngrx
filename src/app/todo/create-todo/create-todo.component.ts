import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { todoActionTypes } from '../store/todo.actions';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  buffer: string = "";

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: any){
    if(submittedForm.invalid){
      return;
    }
    const todo: Todo = {
      Id: '',
      finish: 'false',
      description: submittedForm.value.newTodo,
      User_fk: ''
    };

    this.store.dispatch(todoActionTypes.createTodo({todo}));

  }

}
