import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Category {
  WORK = 'WORK',
  HOME = 'HOME',
  SCHOOL = 'SCHOOL',
  OTHER = 'OTHER'
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface TodoTaskIdRequest {
  taskName: string;
  category: string;
}

export interface ToDoTasks {    
    id: TodoTaskIdRequest,
    description: string,
    status: Status,
    priority: Priority,
    dueDate: Date
}

@Injectable({
  providedIn: 'root',
})
export class TodoTaskService {

  private todoTasksUrl = 'http://localhost:8080/api/todo/tasks';
   private todoTasksCreateUrl = 'http://localhost:8080/api/todo/create';
  private todoTasksUpdateUrl = 'http://localhost:8080/api/todo/update';

  constructor(private http: HttpClient) {}

  getToDoTaskList(): Observable<ToDoTasks[]> {
      const headers = new HttpHeaders()
      .set('X-API-Key', 'test-key-abcde');

    return this.http.get<ToDoTasks[]>(this.todoTasksUrl);
  }

  updateToDoTaskList(toDoTask: ToDoTasks): Observable<ToDoTasks> {
   return this.http.post<ToDoTasks>(this.todoTasksUpdateUrl, toDoTask);
  }

  createDoTaskList(toDoTask: ToDoTasks): Observable<ToDoTasks> {
   return this.http.post<ToDoTasks>(this.todoTasksCreateUrl, toDoTask);
  }

  
}
