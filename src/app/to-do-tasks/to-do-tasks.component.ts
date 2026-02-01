import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
    console.log('Submit button clicked!');
    console.log('Form data:', this.todoTaskRequest);
    
    const apiUrl = AppConfig.apiBaseUrl + AppConfig.endpoints.todo.create;
    console.log('Calling API:', apiUrl);
    
    /*const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });*/

    // todoTaskRequest already contains form values
    this.http.post(apiUrl, this.todoTaskRequest).subscribe({
      next: (res) => {
        console.log('Todo created', res);
        alert("Task created successfully!")

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
      error: err => {
        console.error('Error creating task:', err);
        alert('Error creating task. Check console for details.');
      }
    });
  }
}
