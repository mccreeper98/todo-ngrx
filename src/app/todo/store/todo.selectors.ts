import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, TodoState } from "./todo.reducers";

export const todoFeatureSelector = createFeatureSelector<TodoState>('todos');

export const getAllTodo = createSelector(
  todoFeatureSelector,
  selectAll
);

export const areCoursesLoaded = createSelector(
  todoFeatureSelector,
  state => state.todoLoaded
);
