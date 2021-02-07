import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todo.model";
import { todoActionTypes } from "./todo.actions";

export interface TodoState extends EntityState<Todo>{
  todoLoaded: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState = adapter.getInitialState({
  todoLoaded: false
});

export const todoReducer = createReducer(
  initialState,

  on(todoActionTypes.todoLoaded, (state, action) => {
    return adapter.addAll(
      action.todo,
      {...state, todoLoaded: true}
    );
  }),

  on(todoActionTypes.createTodo, (state, action) => {
    return adapter.addOne(action.todo, state);
  }),

  on(todoActionTypes.deleteTodo, (state, action) => {
    return adapter.removeOne(action.todoId, state);
  }),

  on(todoActionTypes.updateTodo, (state, action) => {
    return adapter.updateOne(action.update, state)
  })

);

export const {selectAll, selectIds} = adapter.getSelectors();
