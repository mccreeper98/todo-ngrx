import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../todo.service";
import { todoActionTypes } from "./todo.actions";
import { concatMap, map, tap } from "rxjs/operators";

@Injectable()
export class TodoEffects{
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.loadTodo),
      concatMap(() => this.todoService.getAllTodo()),
      map(todo => todoActionTypes.todoLoaded({todo}))
    )
  );

  createTodos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(todoActionTypes.createTodo),
    concatMap((action) => this.todoService.createTodo(action.todo)),
    tap(() => this.router.navigateByUrl('/todo'))
  ),
  {dispatch: false}
  );

  deleteTodo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(todoActionTypes.deleteTodo),
    concatMap((action) => this.todoService.deleteTodo(action.todoId))
  ),
  {dispatch: false}
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.updateTodo),
      concatMap((action) => this.todoService.updateTodo(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(
    private todoService: TodoService,
    private actions$: Actions,
    private router: Router
    ){}
}
