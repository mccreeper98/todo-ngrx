import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = environment.apiUrl + "todo/";

  constructor(
    private http: HttpClient
  ) { }

  getAllTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  deleteTodo(todoId: string): Observable<any>{
    return this.http.delete(this.baseUrl + todoId);
  }

  updateTodo(todoId: string | number, changes: Partial<Todo>): Observable<any>{
    return this.http.put(this.baseUrl+todoId, changes);
  }

}
