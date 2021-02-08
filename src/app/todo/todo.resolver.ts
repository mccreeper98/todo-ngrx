import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { AppState } from "../store/reducers";
import { loadTodo, todoLoaded } from "./store/todo.actions";
import { areTodosLoaded } from './store/todo.selectors';

@Injectable()
export class TodoResolver implements Resolve<Observable<any>>{
  constructor(
    private store: Store<AppState>
    ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    return this.store.pipe(
      select(areTodosLoaded),
      tap((todoLoaded) => {
        if(!todoLoaded){
          this.store.dispatch(loadTodo());
        }
      }),
      filter(todoLoaded => todoLoaded),
      first()
    );
  }
}
