import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Todo } from "../todo.model";

export const loadTodo = createAction(
  '[Todo List] Load Todo via service'
);

export const todoLoaded = createAction(
  '[Todo Effects] Todo Loaded Successfully',
  props<{todo: Todo[]}>()
);

export const createTodo = createAction(
  '[Create Todo Component] Create Todo',
  props<{todo: Todo}>()
);

export const deleteTodo = createAction(
  '[Todo List Operations] Delete Todo',
  props<{todoId: string}>()
);

export const updateTodo = createAction(
  '[Todo List Operations] Update Todo',
  props<{update: Update<Todo>}>()
);

export const todoActionTypes = {
  loadTodo,
  todoLoaded,
  createTodo,
  deleteTodo,
  updateTodo
};
