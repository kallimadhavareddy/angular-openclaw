import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-to-do-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do-tasks.component.html',
  styleUrl: './to-do-tasks.component.css',
})
export class ToDoTasks {

  todoTaskRequest = {
    id: {
      taskName: '',
      category: 'WORK'
    },
    description: '',
    status: 'OPEN',
    priority: 'HIGH',
    dueDate: ''
  };

  constructor(private http: HttpClient) {}

  submitToDoTask() {
    const apiUrl = 'http://localhost:8080/api/todo/create';
    /*const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });*/

    // todoTaskRequest already contains form values
    this.http.post(apiUrl, this.todoTaskRequest).subscribe({
      next: (res) => {
        console.log('Todo created', res);
        alert("Hi")

        // reset form model
        this.todoTaskRequest = {
          id: {
            taskName: '',
            category: 'WORK'
          },
          description: '',
          status: 'OPEN',
          priority: 'HIGH',
          dueDate: ''
        };
      },
      error: err => console.error(err)
    });
  }
}
