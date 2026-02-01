import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

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

  private todoTasksUrl = AppConfig.apiBaseUrl + AppConfig.endpoints.todo.tasks;
  private todoTasksUpdateUrl = AppConfig.apiBaseUrl + AppConfig.endpoints.todo.update;

  constructor(private http: HttpClient) {}

  getToDoTaskList(): Observable<ToDoTasks[]> {
      const headers = new HttpHeaders()
      .set('X-API-Key', 'test-key-abcde');

    return this.http.get<ToDoTasks[]>(this.todoTasksUrl);
  }

  updateToDoTaskList(toDoTask: ToDoTasks): Observable<ToDoTasks> {
    const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });

    return this.http.put<ToDoTasks>(this.todoTasksUpdateUrl, toDoTask, { headers });
  }

  createDoTaskList(toDoTask: ToDoTasks): Observable<ToDoTasks> {
   return this.http.post<ToDoTasks>(AppConfig.apiBaseUrl + AppConfig.endpoints.todo.create, toDoTask);
  }

  
}
